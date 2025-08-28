"use client";

import type { Twine, TwineDiameters } from "@sanity/lib/sanity.types";
import { type FC, useState } from "react";
import { currencyFormatter, pricePerMeterFormatter } from "~/lib/formatters";
import type { WithImageAsset } from "~/lib/types";
import AddToCartButton from "./add-to-cart-button";
import Card from "./card";

type TwineCardProps = {
  twine: WithImageAsset<Twine>;
};

const TwineCard: FC<TwineCardProps> = ({ twine }) => {
  const [selectedDiameter] = useState<TwineDiameters[number] | undefined>(
    twine.diameters ? twine.diameters[0] : undefined,
  );

  const [length, setLength] = useState<number>(0);

  if (!selectedDiameter) {
    return;
  }

  if (!twine.diameters) {
    return;
  }

  return (
    <div className="relative z-0">
      <Card className="w-full space-y-3 p-5">
        <h3 className="font-bold">{twine.name}</h3>{" "}
        <span>(szakítószilárdság: {selectedDiameter.tensileStrength} kg)</span>
        <div className="flex flex-wrap gap-2">
          <fieldset className="d-fieldset min-w-fit flex-1">
            <label
              className="d-label"
              htmlFor={`select-diameters-${twine._id}`}
            >
              <span className="d-label-text font-bold">Átmérő</span>
            </label>
            <select id={`select-diameters-${twine._id}`} className="d-select">
              {twine.diameters.map((diamaterItem) => (
                <option key={diamaterItem._key}>
                  {diamaterItem.diameter} mm
                </option>
              ))}
            </select>
          </fieldset>

          <div className="flex-1/2 self-end">
            <fieldset className="d-fieldset">
              <div className="d-join w-fit rounded-r-full outline-offset-0 duration-75 focus-within:outline-2 focus-within:outline-offset-2">
                <input
                  type="number"
                  className="d-input d-join-item w-[clamp(4rem,14rem,100%)] outline-hidden! duration-150 focus:rounded-l-[0.0625rem]"
                  placeholder="hossz"
                  onChange={(e) => setLength(+e.target.value)}
                />
                <span className="d-join-item inline-flex items-center justify-center rounded-r-full border border-neutral-content border-l-0 bg-base-200 px-4">
                  m
                </span>
              </div>
            </fieldset>
          </div>
        </div>
        {selectedDiameter.pricePerMeter && (
          <h2>
            {currencyFormatter(
              selectedDiameter.pricePerMeter * Math.ceil(length),
            )}{" "}
            <span className="text-base text-gray-500">
              ({pricePerMeterFormatter(selectedDiameter.pricePerMeter)})
            </span>
          </h2>
        )}
        <div className="flex justify-end">
          <AddToCartButton
            product={{
              ...twine,
              name: `${twine.name} (${selectedDiameter.diameter} - ${length}m)`,
              price:
                (selectedDiameter.pricePerMeter || Number.NaN) *
                Math.ceil(length),
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default TwineCard;
