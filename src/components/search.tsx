import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  async function searchProduct(formData: FormData) {
    "use server";

    const keyword = formData.get("keyword");
    console.log({ keyword });
  }

  return (
    <form className="flex min-w-3/12 space-x-2" action={searchProduct}>
      <Input name="keyword" placeholder="Search for products..." />
      <Button size="icon" type="submit">
        <Search />
      </Button>
    </form>
  );
}
