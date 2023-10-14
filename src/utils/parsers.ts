import { parseArgs } from "util";
import { type TravelInput } from "../models/input";

const parseInput = (args: string[]): TravelInput | false => {
  const {
    values: {
      adultos,
      niños,
      bebes,
      scanDays,
      agrupar,
      duracionMax,
      escalasMax,
      clase,
      asientosMin,
      tasas,
      awards,
      ppm,
    },
    positionals,
  } = parseArgs({
    args,
    options: {
      adultos: { type: "string", short: "a", default: "1" },
      niños: { type: "string", short: "n", default: "0" },
      bebes: { type: "string", short: "b", default: "0" },
      scanDays: { type: "string", short: "s", default: "10" },
      agrupar: { type: "string", short: "g", default: "si" },
      clase: { type: "string", short: "c", default: "all" },
      tasas: { type: "string", short: "t", default: "si" },
      awards: { type: "string", short: "w", default: "si" },
      ppm: { type: "string", short: "p", default: "1.9" },
      asientosMin: { type: "string", default: "1" },
      duracionMax: { type: "string", short: "d", default: "48" },
      escalasMax: { type: "string", short: "e", default: "8" },
    },
    allowPositionals: true,
  });

  if (positionals.length <= 3) return false;

  return {
    origen: positionals[1].toUpperCase(),
    destino: positionals[2].toUpperCase(),
    ida: positionals[3].toUpperCase(),
    scanDays: Number(scanDays),
    adultos: Number(adultos),
    niños: Number(niños),
    bebes: Number(bebes),
    agrupar: agrupar?.toUpperCase() === "SI",
    tasas: tasas?.toUpperCase() === "SI",
    awards: awards?.toUpperCase() === "SI",
    ppm: Number(ppm),
    clase: String(clase).toUpperCase(),
    duracionMax: Number(duracionMax),
    escalasMax: Number(escalasMax),
    asientosMin: Number(asientosMin),
  };
};

export default parseInput;
