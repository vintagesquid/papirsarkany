import Heading from "~/components/heading";

export default function SuccessfulOrder() {
  return (
    <div className="grid items-center text-center">
      <div>
        <Heading as="h1" className="font-bold">
          Sikeres rendelés!
        </Heading>
        <div className="">Hamarosan felveszem önnel a kapcsolatot.</div>
      </div>
    </div>
  );
}
