"use client";

import type { Rod, RodDiameters } from "@sanity/lib/sanity.types";
import { type ChangeEvent, type FC, useState } from "react";
import { currencyFormatter, pricePerMeterFormatter } from "~/lib/formatters";
import type { WithImageAsset } from "~/lib/types";
import AddToCartButton from "./add-to-cart-button";
import Card from "./card";
import Heading from "./heading";

type RodCardProps = {
  rod: WithImageAsset<Rod>;
};

const RodCard: FC<RodCardProps> = ({ rod }) => {
  const [selectedDiameter, setSelectedDiameter] = useState<
    RodDiameters[number] | undefined
  >(rod.diameters ? rod.diameters[0] : undefined);

  const [selectedLength, setSelectedLength] = useState<number | undefined>(
    getSelectedDiamaterFirstLength(selectedDiameter),
  );

  function getSelectedDiamaterFirstLength(
    selectedDiameter: RodDiameters[number] | undefined,
  ) {
    if (!selectedDiameter?.lengths) {
      return undefined;
    }

    return selectedDiameter.lengths[0];
  }

  const handleDiameterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const diamaterName = e.target.value;

    const newSelectedDiameter = rod.diameters?.find(
      (diameter) => diameter.diameter === diamaterName,
    );

    if (!newSelectedDiameter) {
      throw new Error("No diamater found.");
    }

    setSelectedDiameter({
      _key: newSelectedDiameter._key,
      diameter: diamaterName,
      pricePerMeter: newSelectedDiameter.pricePerMeter,
      lengths: newSelectedDiameter.lengths,
    });

    setSelectedLength(getSelectedDiamaterFirstLength(newSelectedDiameter));
  };

  if (!rod.diameters) {
    return;
  }

  if (!selectedDiameter?.lengths) {
    return;
  }

  return (
    <div className="relative z-0">
      <Card className="w-full space-y-3 p-5">
        <Heading as="h3" className="font-bold">
          {rod.name}
        </Heading>

        <div className="flex flex-wrap gap-2">
          <fieldset className="d-fieldset flex-1">
            <label className="d-label" htmlFor={`select-diameter-${rod._id}`}>
              <span className="d-label-text font-bold">Átmérő</span>
            </label>
            <select
              id={`select-diameter-${rod._id}`}
              className="d-select"
              value={selectedDiameter.diameter}
              onChange={(e) => {
                handleDiameterChange(e);
              }}
            >
              {rod.diameters.map((diamater) => (
                <option key={diamater._key} value={diamater.diameter}>
                  {diamater.diameter} mm
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="d-fieldset flex-1">
            <label className="d-label" htmlFor={`select-length-${rod._id}`}>
              <span className="d-label-text font-bold">Hossz</span>
            </label>
            <select
              id={`select-length-${rod._id}`}
              className="d-select"
              onChange={(e) => setSelectedLength(+e.target.value)}
              value={selectedLength}
            >
              {selectedDiameter.lengths.map((length) => (
                <option key={length} value={length}>
                  {length} cm
                </option>
              ))}
            </select>
          </fieldset>
        </div>
        {selectedDiameter.pricePerMeter && selectedLength && (
          <Heading as={"h2"}>
            {currencyFormatter(
              selectedDiameter.pricePerMeter * Math.ceil(selectedLength / 100),
            )}{" "}
            <span className="text-base text-gray-500">
              ({pricePerMeterFormatter(selectedDiameter.pricePerMeter)})
            </span>
          </Heading>
        )}

        <div className="flex justify-end">
          <AddToCartButton
            product={{
              ...rod,
              name: `${rod.name} (${selectedDiameter.diameter} mm - ${selectedLength} cm)`,
              price:
                (selectedDiameter.pricePerMeter || Number.NaN) *
                Math.ceil((selectedLength || Number.NaN) / 100),
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default RodCard;
