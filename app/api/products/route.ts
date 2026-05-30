import { NextResponse } from 'next/server';
import { Types } from 'mongoose';
import dbConnect from '@/lib/db';
import Coffee, { ICoffeeProduct } from '@/models/Coffee';
import { coffeeProducts } from '@/data/products';
import { verifyAccessToken } from '@/utils/jwt';

type ProductWithOptionalId = ICoffeeProduct & { _id?: Types.ObjectId; id?: string };

function getAuthToken(req: Request) {
  const authHeader = req.headers.get('authorization');
  return authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
}

export async function GET(req: Request) {
  try {
    try {
      await dbConnect();
      const count = await Coffee.countDocuments();
      if (count === 0) {
        await Coffee.insertMany(coffeeProducts.map((product) => ({
          name: product.name,
          description: product.description,
          price: product.price,
          rating: product.rating,
          image: product.image,
          features: product.features,
          reviews: product.reviews,
          roastLevel: product.roastLevel,
          flavorNotes: product.flavorNotes,
          origin: product.origin,
          acidity: 3,
          body: 3,
          strength: 3,
          sweetness: 3,
          milkCompatible: true,
          slug: product.id
        })));
      }
    } catch (dbError) {
      console.error('Product list DB connection failed, using fallback product data:', dbError);
    }

    const url = new URL(req.url);
    const search = url.searchParams.get('q') || '';
    const roast = url.searchParams.get('roast');
    const minPrice = url.searchParams.get('minPrice');
    const maxPrice = url.searchParams.get('maxPrice');
    const sort = url.searchParams.get('sort');
    const origin = url.searchParams.get('origin');

    const filter: Record<string, unknown> = {};
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (roast) {
      filter.roastLevel = roast;
    }
    if (origin) {
      filter.origin = origin;
    }

    let products: ProductWithOptionalId[] = [];
    try {
      await dbConnect();
      products = (await Coffee.find(filter).lean()) as unknown as ProductWithOptionalId[];
    } catch (dbError) {
      console.error('Product list DB fetch failed, using fallback product data:', dbError);
      products = (coffeeProducts.map((product) => ({
        ...product,
        id: product.id,
      })) as unknown) as ProductWithOptionalId[];
    }

    const filtered = products
      .filter((product) => {
        const price = parseFloat(product.price.replace('$', ''));
        if (minPrice && price < Number(minPrice)) return false;
        if (maxPrice && price > Number(maxPrice)) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sort) {
          case 'price-low':
            return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
          case 'price-high':
            return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
          case 'rating':
            return b.rating - a.rating;
          default:
            return a.name.localeCompare(b.name);
        }
      })
      .map((product) => {
        const productDoc = product as ProductWithOptionalId;
        const id = productDoc._id ? productDoc._id.toString() : productDoc.id;
        const slug = productDoc.slug || id;
        return {
          ...productDoc,
          id,
          slug
        };
      });

    return NextResponse.json(filtered, { status: 200 });
  } catch (error) {
    console.error('Product list error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = getAuthToken(req);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyAccessToken(token);
    if (!payload?.role || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { name, description, price, image, roastLevel, origin, features = [], flavorNotes = [] } = body;
    if (!name || !description || !price || !image || !roastLevel || !origin) {
      return NextResponse.json({ error: 'Product data missing' }, { status: 400 });
    }

    await dbConnect();
    const created = await Coffee.create({
      name,
      description,
      price,
      rating: body.rating || 5,
      image,
      features,
      reviews: [],
      roastLevel,
      flavorNotes,
      origin,
      acidity: body.acidity || 3,
      body: body.body || 3,
      strength: body.strength || 3,
      sweetness: body.sweetness || 3,
      milkCompatible: body.milkCompatible ?? true,
      slug: body.slug || name.toLowerCase().replace(/\s+/g, '-')
    });

    return NextResponse.json({ message: 'Product created', product: { ...created.toObject(), id: created._id.toString() } }, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
