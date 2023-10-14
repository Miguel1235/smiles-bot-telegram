import { bold, code, fmt, italic, underline } from "telegraf/format";
import { emojis } from "../emojis/emojis";

export const HELPER_TEXT = fmt`
  ${bold`${underline`Búsqueda simple:`}`}

  ${code`EZE MIA DIC`} ${italic`${emojis.FINGER} Vuelos para el mes de diciembre del año actual`}
  ${code`EZE MIA 12/2023`} ${italic`${emojis.FINGER} Vuelos para el mes de diciembre del 2023`}
  ${code`EZE MIA 15/12/2023`} ${italic`${emojis.FINGER} Vuelos para el dia 15 de diciembre en adelante`}

  ${bold`${underline`Búsqueda por region:`}`}

  ${code`EZE EU NOV`} ${italic`${emojis.FINGER} Vuelos con destino a Europa para noviembre`}
  ${code`LIMITROFE ASIA NOV`} ${italic`${emojis.FINGER} Vuelos con destino a Asia para diciembre desde un pais limítrofe`}

  ${bold`${underline`Búsqueda por multiples origenes/destinos:`}`}

  ${code`EZE,RIO EU,CUN DIC`} ${italic`${emojis.FINGER} Vuelos con origen en EZE o RIO y destino Europa o Cancún. Cada destino/origen es separado por una ","`}

  ${bold`${underline`Búsqueda con filtros:`}`}

  ${code`EZE MIA DIC -a 2`} ${italic`${emojis.FINGER} Vuelos para 2 adultos`}
  ${code`EZE MIA DIC -a 2 -n 1`} ${italic`${emojis.FINGER} Vuelos con destino a Europa para 2 adultos y 1 niño`}
  ${code`EZE MIA DIC -a 1 -n 1 -b 1`} ${italic`${emojis.FINGER} Vuelos con destino a Europa para 1 adulto, 1 niño y 1 bebe`}
  ${code`EZE MIA DIC -d 15`} ${italic`${emojis.FINGER} Vuelos con destino a Miami con una duración inferior a 15 horas`}
  ${code`EZE MIA DIC -e 3`} ${italic`${emojis.FINGER} Vuelos con destino a Miami con un máximo de 2 escalas`}
  ${code`EZE MIA DIC -c ECO`} ${italic`${emojis.FINGER} Vuelos de clase económica`}
  ${code`EZE MIA DIC -c EJE`} ${italic`${emojis.FINGER} Vuelos de clase ejecutiva`}


  ${bold`${underline`Misc:`}`}

  ${code`EZE MIA DIC -g NO`} ${italic`${emojis.FINGER} Por defecto el bot agrupa por dia el vuelo sale menos millas, si queres mostrar todos los vuelos, podes usar la option -g NO`}
  ${code`EZE MIA DIC -s 3`} ${italic`${emojis.FINGER} Numero de dias a escanear, por defecto toma 10 dias, si el numero es muy grande la cantidad de requests a smiles es mayor y puede fallar`}
  ${code`EZE MIA DIC -t NO`} ${italic`${emojis.FINGER} No calcular las tasas, si no calculamos las tasas, se hacen menos requests a smiles, por lo tanto la respuesta es mas rápida.`}
  ${code`EZE MIA DIC -p 2.24`} ${italic`${emojis.FINGER} Especificamos que el precio de las millas es de 2.24, por defecto: 2.19`}

  ${bold`${underline`Información:`}`}

  ${code`/aeropuertos`} ${italic`Mostrar posibles aeropuertos a utilizar`}
  ${code`/aerolineas`} ${italic`Mostrar todas las aerolíneas`}
  ${code`/meses`} ${italic`Listado de numero y nombre del mes`}
  ${code`/regiones`} ${italic`Mostrar posibles regiones a utilizar con sus respectivos aeropuertos`}
  `;

export const FINDER_TEXT = fmt`${italic`Buscando vuelos...${emojis.SEARCH}`}`;

export const FLIGHTS_NOT_FOUND = fmt`${italic`No hubo resultados en tu busqueda, volve a probar con menos restricciones o cambiando la fecha`}`;

export const INVALID_INPUT = fmt`${italic`Formato de parametros incorrecto`}`;
