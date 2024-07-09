import { ReadonlyURLSearchParams } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) {
  const keys = Object.keys(searchParams);
  const values = Object.values(searchParams).map((value) => {
    const numberValue = Number(value);
    return isNaN(numberValue) ? value : numberValue;
  });
  const data = Object.fromEntries(
    keys.map((key, index) => [key, values[index]])
  );
  console.log("data", data);
  return (
    <main>
      <h1>Results</h1>
    </main>
  );
}
