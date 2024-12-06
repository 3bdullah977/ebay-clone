import Image from "next/image";
import iphone from "@/public/iphone14.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchableProduct } from "@/lib/product";

export default function Product({ product }: { product: SearchableProduct }) {
  return (
    <>
      <Card>
        <CardHeader className="bg m-4 rounded-lg">
          <Image
            src={product.imageUrl || iphone}
            width={100}
            height={100}
            alt="iphone"
            className="place-self-center py-8"
          />
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-blue-500">{product.price}</p>
          </div>
          <div>
            <h1 className="font-bold">{product.title}</h1>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
