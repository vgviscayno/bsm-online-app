import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <section className="flex flex-col h-svh">
      <div className="w-full">
        <Loader2 size={264} className="mr-auto ml-auto animate-spin" />
      </div>
    </section>
  );
}
