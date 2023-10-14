import { bold, code, fmt, italic, underline } from "telegraf/format";
import { emojis } from "../emojis/emojis";

export const REGIONS_TEXT = fmt`
  ${bold`${underline`Regiones:`}`}
  
  ${code`LIMITROFE`} ${italic`${emojis.FINGER} SCL,MVD,ASU,SAO,RIO`}
  ${code`ARG`} ${italic`${emojis.FINGER} BUE,COR,ROS,MDZ,NQN,BRC,IGR`}
  ${code`EU`} ${italic`${emojis.FINGER} LIS,MAD,BCN,PAR,AMS,ROM,LON,FRA,IST`}
  ${code`USAESTE`} ${italic`${emojis.FINGER} NYC,WAS,PHL,BOS,DTT,CHI`}
  ${code`USAOESTE`} ${italic`${emojis.FINGER} LAX,HNL,SFO,LAS,SAN,SMF`}
  ${code`USASUR`} ${italic`${emojis.FINGER} DFW,PHX,IAH,SAT,ATL`}
  ${code`CAN`} ${italic`${emojis.FINGER} YTO,YMQ,YVR,YOW,YQB`}
  ${code`AFRICA`} ${italic`${emojis.FINGER} CAI,SEZ,CPT,DAR,ADD,RBA`}
  ${code`OCEANIA`} ${italic`${emojis.FINGER} AKL,SYD,MEL`}
  ${code`SAMERICA`} ${italic`${emojis.FINGER} SCL,LIM,BOG,BUE,MVD,ASU,UIO`}
  ${code`BRA`} ${italic`${emojis.FINGER} RIO,SAO,FLN,MCZ,SSA,REC,NAT,IGU`}
  ${code`COL`} ${italic`${emojis.FINGER} BOG,ADZ,CTG,SMR`}
  ${code`NAMERICA`} ${italic`${emojis.FINGER} MEX,CHI,NYC,LAX,DFW,SFO,LAS`}
  ${code`CARIBE`} ${italic`${emojis.FINGER} CUN,PTY,PUJ,SJO,AUA,HAV,CTG,SJU`}
  ${code`FLORIDA`} ${italic`${emojis.FINGER} MIA,FLL,MCO,TPA`}
  ${code`HAWAII`} ${italic`${emojis.FINGER} HNL,LIH,KOA,OGG`}
  ${code`ESP`} ${italic`${emojis.FINGER} MAD,BCN,VLC,PMI,AGP,IBZ,SVQ,BIO`}
  ${code`ITA`} ${italic`${emojis.FINGER} ROM,MIL,BLQ,VCE,NAP`}
  ${code`FRA`} ${italic`${emojis.FINGER} PAR,MRS,NCE,LYS,NTE,TLS`}
  ${code`NORDICO`} ${italic`${emojis.FINGER} CPH,HEL,STO,OSL,BGO,SVG,GOT`}
  ${code`ASIA`} ${italic`${emojis.FINGER} DXB,BKK,TLV,TYO,SEL,DPS`}
  ${code`MORIENTE`} ${italic`${emojis.FINGER} IST,CAI,DXB,TLV,DOH`}
  ${code`SASIA`} ${italic`${emojis.FINGER} BKK,SIN,MLE,DPS,SGN,KUL`}
  ${code`NASIA`} ${italic`${emojis.FINGER} TYO,SEL,HKG`}
  ${code`IND`} ${italic`${emojis.FINGER} DEL,BLR,BOM,CCU,JAI`}
`
export const HELPER_TEXT = fmt`
  ${bold`${underline`Búsqueda simple:`}`}

  ${code`EZE MIA DIC`} ${italic`${emojis.FINGER} Vuelos para el mes de diciembre del año actual, para limitar la cantidad de requests enviadas al servicio de smiles, solamente escanea los primeros 10 dias del mes especificado, si querés hacer una búsqueda escaneando una mayor cantidad de dias, podes usar la opción -g, la cual se muestra como se usa en Misc.`}
  ${code`EZE MIA FEB`} ${italic`${emojis.FINGER} Si especificas un mes que ya paso, toma el del año siguiente, en este caso vuelos para febrero del 2024`}
  ${code`EZE MIA 12/2023`} ${italic`${emojis.FINGER} Vuelos para el mes de diciembre del 2023`}
  ${code`EZE MIA 15/12/2023`} ${italic`${emojis.FINGER} Vuelos para el dia 15 de diciembre en adelante`}

  ${bold`${underline`Búsqueda por region:`}`}

  ${code`EZE EU NOV`} ${italic`${emojis.FINGER} Vuelos con destino a Europa para noviembre`}
  ${code`LIMITROFE ASIA NOV`} ${italic`${emojis.FINGER} Vuelos con destino a Asia para diciembre desde un pais limítrofe`}

  ${bold`${underline`Búsqueda por multiples orígenes/destinos:`}`}

  ${code`EZE,RIO EU,CUN DIC`} ${italic`${emojis.FINGER} Vuelos con origen en EZE o RIO y destino Europa o Cancún. Cada destino/origen es separado por una ","`}

  ${bold`${underline`Búsqueda con filtros:`}`}

  ${code`EZE MIA DIC -a 2`} ${italic`${emojis.FINGER} Vuelos para 2 adultos. Valor por defecto: 1 adulto`}
  ${code`EZE MIA DIC -n 1`} ${italic`${emojis.FINGER} Vuelos para 1 adulto y 1 niño. Valor por defecto: 0 niños`}
  ${code`EZE MIA DIC -b 1`} ${italic`${emojis.FINGER} Vuelos para 1 adulto y 1 bebe. Valor por defecto: 0 bebes`}

  ${code`EZE MIA DIC -d 15`} ${italic`${emojis.FINGER} Vuelos con destino a Miami con una duración inferior a 15 horas`}
  ${code`EZE MIA DIC -e 3`} ${italic`${emojis.FINGER} Vuelos con destino a Miami con un máximo de 2 escalas`}
  ${code`EZE MIA DIC -c ECO`} ${italic`${emojis.FINGER} Vuelos de clase económica`}
  ${code`EZE MIA DIC -c EJE`} ${italic`${emojis.FINGER} Vuelos de clase ejecutiva`}
  
  ${italic`${underline`Se pueden poner varios filtros a la vez:`}`}
  
  ${code`EZE MIA DIC -a 2 -n 1`} ${italic`${emojis.FINGER} Vuelos con destino a Europa para 2 adultos y 1 niño`}
  ${code`EZE MIA DIC -a 1 -n 1 -b 1`} ${italic`${emojis.FINGER} Vuelos con destino a Europa para 1 adulto, 1 niño y 1 bebe`}

  ${code`EZE MIA DIC -d 15 -c ECO -e 3`} ${italic`${emojis.FINGER} Vuelos con destino a Miami con una duración inferior a 15 horas, en clase económica con un máximo de 3 escalas`}

  ${bold`${underline`Misc:`}`}

  ${code`EZE MIA DIC -g NO`} ${italic`${emojis.FINGER} Por defecto el bot agrupa por dia el vuelo sale menos millas, si querés mostrar todos los vuelos, podes usar la option -g NO`}
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

export const FLIGHTS_NOT_FOUND = fmt`${italic`No hubo resultados en tu búsqueda, volvé a probar con menos restricciones o cambiando la fecha`}`;

export const INVALID_INPUT = fmt`${italic`Formato de parámetros incorrecto`}`;
