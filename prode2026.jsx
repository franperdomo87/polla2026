import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from "react";
// ═══════════════════════════════════════════════════════════════
// 🌍 MUNDIAL — Historia de la Copa del Mundo
// ═══════════════════════════════════════════════════════════════
const FACTS_MUNDIAL = [
  {e:"🇧🇷",t:"Brasil es el único país en haber participado en TODOS los Mundiales FIFA: las 23 ediciones desde Uruguay 1930. Una racha que ninguna otra selección ha podido igualar."},
  {e:"⚡",t:"El gol más rápido de un Mundial lo marcó Hakan Şükür (Turquía): solo 11 segundos contra Corea del Sur en el partido por el 3° puesto de 2002. Casi nadie tuvo tiempo de sentarse."},
  {e:"⚽",t:"Just Fontaine (Francia) marcó 13 goles en el Mundial 1958. Lleva 66 años siendo el récord absoluto en una sola edición. Ningún jugador ha llegado siquiera a 10 desde entonces."},
  {e:"👑",t:"Pelé es el único jugador en ganar tres Mundiales (1958, 1962, 1970). En el primero tenía 17 años y anotó un hat-trick en semis. En el tercero, a los 29, fue el mejor del torneo."},
  {e:"💥",t:"La mayor goleada mundialista: Hungría 10-1 El Salvador en España 1982. László Kiss entró al campo en el 55' y metió hat-trick en solo 8 minutos. Récord que difícilmente caerá."},
  {e:"🎯",t:"Miroslav Klose (Alemania) es el máximo goleador histórico del Mundial con 16 goles en 4 torneos (2002-2014). Superó a Ronaldo Nazário en Brasil 2014 con el gol del empate vs. Brasil en semis."},
  {e:"😱",t:"El 'Maracanazo': en 1950, Uruguay venció a Brasil 2-1 ante 200,000 hinchas en el Maracaná. No había una final formal — era una liguilla. Uruguay salió campeón y Brasil lloró durante días."},
  {e:"🔥",t:"Austria 7-5 Suiza en Suiza 1954: el partido con más goles de la historia mundialista. Austria iba perdiendo 3-0, remontó a 5-3 a favor, luego 5-4 en contra y terminó ganando 7-5. Épico."},
  {e:"🤦",t:"Zidane fue expulsado en la final de Alemania 2006 por un cabezazo al pecho de Materazzi en la prórroga. Era su último partido profesional. Francia perdió en penales. El cierre más agridulce del fútbol."},
  {e:"✋",t:"La 'Mano de Dios' y 'El Gol del Siglo' se marcaron en el mismo partido (Argentina vs. Inglaterra, México 1986) con solo 4 minutos de diferencia. Dos extremos del fútbol en una sola tarde."},
  {e:"😭",t:"Alemania goleó 7-1 a Brasil en las semis de Brasil 2014. Los primeros 5 goles llegaron en 18 minutos. El periodismo brasileño acuñó 'Mineirazo'. Fue la mayor derrota local en 100 años de fútbol carioca."},
  {e:"🏆",t:"El primer Mundial se jugó en Uruguay 1930 con solo 13 equipos. Los europeos tardaron dos semanas en barco para llegar. Argentina y Uruguay llegaron a la final. Uruguay ganó 4-2."},
  {e:"🧤",t:"Roger Milla (Camerún) fue el jugador más viejo en anotar en un Mundial: lo hizo a los 42 años vs. Rusia en USA 1994. Festejó bailando en el córner, como siempre. El mundo lo amó."},
  {e:"🎭",t:"Arabia Saudita venció a Argentina 2-1 en Qatar 2022. El gobierno declaró festivo nacional. Argentina luego ganó el Mundial. La selección saudita fue eliminada en grupos. El fútbol es así."},
  {e:"🌟",t:"Italia vs Brasil en España 1982 es el partido más votado como el mejor de la historia del Mundial. Italia ganó 3-2 con hat-trick de Paolo Rossi, eliminando al gran favorito."},
  {e:"🏅",t:"Solo 8 países han ganado la Copa del Mundo en sus 22 ediciones: Brasil (5), Alemania (4), Italia (4), Argentina (3), Francia (2), Uruguay (2), España (1) e Inglaterra (1)."},
  {e:"🐕",t:"La Copa Jules Rimet fue robada en Londres en 1966 antes del Mundial inglés. La encontró un perro llamado Pickles en un jardín. En 1983 fue robada en Brasil y nunca recuperada — fundieron otra."},
  {e:"👐",t:"Gordon Banks hizo 'la atajada del siglo' a un remate de Pelé en 1970. El balón picó justo, Pelé ya festejaba. Banks lo sacó por debajo del travesaño. Pelé dijo: 'el mejor gol que no marqué'."},
  {e:"⚔️",t:"'La Batalla de Santiago' (Chile vs. Italia, 1962) fue el partido más violento de la historia mundialista. Dos expulsados, múltiples golpes. El árbitro Ken Aston la describió como 'una guerra sucia'."},
  {e:"🎸",t:"En USA 1950, la final no existió como tal: era una liguilla final de 4 equipos. Uruguay vs. Brasil fue el partido decisivo. Uruguay ganó 2-1 ante 200.000 personas. El trauma dura hasta hoy."},
  {e:"🎪",t:"El estadio Azteca (México) es el único en albergar dos finales mundialistas: 1970 (Brasil 4-1 Italia) y 1986 (Argentina 3-2 Alemania). También fue escenario del 'Gol del Siglo'."},
  {e:"🌍",t:"El Mundial 1942 y 1946 fueron cancelados por la Segunda Guerra Mundial — los únicos en la historia. FIFA siguió funcionando pero sin torneo durante 12 años."},
  {e:"🇮🇳",t:"India se retiró del Mundial 1950 porque la FIFA no le permitió jugar descalza, como era la costumbre de algunos de sus jugadores. Una curiosidad histórica irrepetible."},
  {e:"🇸🇳",t:"Senegal debutó en el Mundial 2002 venciendo a Francia (campeona vigente) 1-0. Los jugadores celebraron bailando junto al banderín de córner. Llegaron a cuartos de final en su primera participación."},
  {e:"🤝",t:"En Francia 1998, Irán venció a EEUU 2-1 en el partido más político del Mundial. Antes del encuentro, los jugadores se intercambiaron flores blancas. Gol de Hamid Estili y Mehdi Mahdavikia."},
  {e:"🎩",t:"Dennis Bergkamp (Países Bajos) anotó vs. Argentina en cuartos de 1998 el gol más técnicamente perfecto de la historia: control con el pecho, giro y disparo en un solo movimiento fluido."},
  {e:"🥅",t:"El gol de Carlos Alberto Torres (Brasil, final 1970) fue resultado de 12 pases continuos. Arrancó en el área propia de Brasil. Es considerado el gol colectivo más bello de la historia mundialista."},
  {e:"📺",t:"El primer Mundial televisado en directo fue Suiza 1954. El primero global fue México 1970, cuando la TV satelital llegó por primera vez a los 5 continentes simultáneamente."},
  {e:"🟨",t:"Las tarjetas amarillas y rojas se usaron por primera vez en un Mundial en Alemania 1970, ideadas por el árbitro Ken Aston. La inspiración: un semáforo en Kensington, Londres."},
  {e:"🇧🇬",t:"Bulgaria llegó a semis del Mundial 1994 con Hristo Stoichkov (Balón de Oro ese año). Era la primera — y única — semifinal búlgara. Perdieron vs. Italia con un polémico gol de Baggio."},
  {e:"🔴",t:"Roberto Baggio falló el penal definitivo en la final de USA 1994 vs. Brasil. Italia perdió la tanda 3-2. La imagen de Baggio tapándose los ojos es una de las más icónicas del deporte moderno."},
  {e:"🇨🇲",t:"Camerún en Italia 1990 eliminó a Argentina (campeona vigente) 1-0 en el debut, con Roger Milla como figura. Fue la primera selección africana en llegar a cuartos de final de un Mundial."},
  {e:"🥱",t:"El 'Anschluss de Gijón' (1982): Alemania y Austria jugaron un partido de grupos cuyo resultado (1-0 alemán) convenía a ambas para avanzar, eliminando a Argelia. FIFA luego obligó a que los últimos partidos de grupo se jugaran simultáneamente."},
  {e:"🇰🇵",t:"Corea del Norte en 1966 llegó a cuartos de final venciendo a Italia 1-0. En cuartos, iban ganando 3-0 a Portugal antes de que Eusébio marcara 4 goles. Portugal ganó 5-3. El partido más épico de esa edición."},
  {e:"🧠",t:"El arbitraje del Mundial evolucionó drásticamente: en 1930 los árbitros eran elegidos entre los fanáticos presentes. Hoy el VAR usa cámaras de alta velocidad y líneas de offside por milímetros."},
  {e:"🏟️",t:"Jairzinho (Brasil 1970) es el único jugador en anotar en todos los partidos de un Mundial — incluida la final. Brasil ganó 6-0 vs. Checoslovaquia, 3-1 vs. Rumania y 4-1 en la final vs. Italia."},
  {e:"🇺🇸",t:"EEUU terminó 3° en el primer Mundial de 1930 — el mejor resultado de la historia de esa selección. En 1950 venció a Inglaterra 1-0 en lo que fue llamado 'la mayor sorpresa del fútbol' hasta 2022."},
  {e:"⚽",t:"La pelota del Mundial 2010 (Jabulani) fue tan criticada por su trayectoria impredecible que los porteros se quejaron públicamente. La de 2014 (Brazuca) fue diseñada con 5 millones de euros de investigación."},
  {e:"🇲🇽",t:"México organizó el Mundial 1986 en solo 4 meses tras la renuncia de Colombia por crisis económica. Un mes después llegó el terremoto de septiembre de 1985. La hazaña logística fue doble."},
  {e:"⏱️",t:"En el Mundial 2022 el promedio de tiempo de descuento fue 12 minutos por partido — récord histórico. El VAR y las paradas por lesiones alargaron los partidos de forma nunca vista."},
  {e:"🎯",t:"Gerd Müller marcó 14 goles en dos Mundiales (1970 y 1974), ganando ambas Botas de Oro. En 1970 fue el máximo goleador con 10 goles — récord del torneo hasta que Klose lo superó en 2006."},
  {e:"🇭🇷",t:"El 'Partido del Siglo' entre Italia y Alemania en semis de 1970 terminó 4-3 en prórroga. Cinco goles en los últimos 20 minutos del tiempo extra. Rivera, Müller, Boninsegna, Burgnich... una noche irrepetible."},
  {e:"🌐",t:"El Mundial Qatar 2022 tuvo la audiencia acumulada más grande de la historia: más de 5,000 millones de espectadores en todo el torneo. La final France-Argentina fue vista por 1,500 millones en simultáneo."},
  {e:"💰",t:"La Copa del Mundo pesa 6.175 kg, mide 36.5 cm y está hecha de oro macizo de 18 quilates con base de malaquita. Los campeones reciben una réplica chapada — el original se guarda en el Museo FIFA en Zúrich."},
  {e:"🤩",t:"Thomas Müller ganó el Botín de Oro del Mundial 2010 a los 20 años, en su debut, con 5 goles y 3 asistencias. Fue el primer jugador debutante en ganar ese premio desde Pelé en 1958."},
  {e:"🌴",t:"Jamaica participó en el Mundial 1998 con Theodore Whitmore, el primer jamaicano en anotar dos goles en un Mundial (vs. Japón). Los reggae boys siguen siendo recordados con cariño."},
  {e:"🎬",t:"El documental 'Senna' (2010) y 'El Capitán' (2014) han convertido momentos mundialistas en película. Pero 'Zidane: A 21st Century Portrait' (2006) filmó a un solo jugador los 90 minutos de un partido."},
  {e:"🏆",t:"Argentina ganó su 3° título en Qatar 2022 con el equipo de Messi — el más difícil de todos. Perdió vs. Arabia Saudita en grupos, ganó en prórroga vs. Países Bajos y en penales vs. Francia en la final."},
  {e:"🤯",t:"En 1950, Bolivia perdió 8-0 ante Uruguay en el primer partido mundialista de su historia. Pero clasificó porque EEUU, España e Inglaterra se retiraron o no llegaron al grupo. El fútbol tiene sus misterios."},
  {e:"🇸🇪",t:"Suecia jugó la final del primer Mundial disputado en su territorio (1958) y perdió 5-2 ante Brasil. Pelé tenía 17 años y marcó dos goles, incluido un magistral sombrero previo al remate."},
  {e:"🚩",t:"El partido con más espectadores de la historia mundialista fue la final de 1950 en el Maracaná, con estimaciones de hasta 210,000 personas. El récord oficial de FIFA es 173,850 — igualmente histórico."},
  {e:"🤺",t:"En los Mundiales, 4 países han ganado el torneo jugando fuera de su continente: Brasil en Europa (1958), Alemania en América (2014), España en África (2010) y Argentina en América y Europa."},
  {e:"🧪",t:"La 'Naranja Mecánica' holandesa de 1974 inventó el 'fútbol total' con Cruyff: cualquier jugador podía ocupar cualquier posición. Llegaron a la final pero perdieron vs. Alemania. El estilo importó más que el trofeo."},
  {e:"🔁",t:"El único jugador en marcar en cuatro Mundiales consecutivos es Uwe Seeler (Alemania, 1958-1970). Pelé lo hizo en tres (1958, 1962, 1970). Klose también en cuatro (2002-2014)."},
  {e:"🕰️",t:"El primer gol del Mundial lo marcó Lucien Laurent (Francia) vs. México el 13 de julio de 1930. No fue reconocido masivamente durante décadas — murió en 2005 sin haber sido celebrado como merecía."},
  {e:"🗓️",t:"El Mundial 2026 tendrá 104 partidos en 39 días repartidos en 3 países y 16 estadios: 11 en EEUU, 3 en México y 2 en Canadá. La final es el 19 de julio en el MetLife Stadium, Nueva Jersey."},
  {e:"📊",t:"En Brasil 2014 se marcaron 171 goles en 64 partidos — el promedio más alto desde Francia 1998 (171 también, pero con mismo número). Alemania contribuyó con 18, incluidos los 7 a Brasil."},
  {e:"🌊",t:"El VAR (Video Assistant Referee) debutó oficialmente en el Mundial de Rusia 2018. En ese torneo se revisaron 335 incidentes y se revertieron 20 decisiones. Cambió el fútbol para siempre."},
  {e:"⭐",t:"El récord de selecciones en un Mundial creció así: 13 en 1930, 16 en 1934, 24 en 1982, 32 en 1998 y ahora 48 en 2026. Cada ampliación incluyó más representación de África, Asia y CONCACAF."},
  {e:"🤝",t:"El partido más corto en completarse fue en el Mundial 1930: EEUU vs. Paraguay. El árbitro Ulrico Saucedo cobró 2 penales polémicos. El fútbol de aquella época no tenía muchas reglas escritas."},
  {e:"🦅",t:"El gol de Maradona ante Bélgica en semis del 86 (su segunda obra de arte del torneo) fue técnicamente más difícil que el 'Gol del Siglo': regateó a 5 jugadores en menos espacio y con mayor presión."},
];

// ═══════════════════════════════════════════════════════════════
// 🇨🇴 COLOMBIA — Fútbol y cultura colombiana
// ═══════════════════════════════════════════════════════════════
const FACTS_COLOMBIA = [
  {e:"🏁",t:"Colombia debutó en un Mundial en Chile 1962 y tardó 28 años en clasificar de nuevo. En ese debut perdió 4-4 contra la URSS en una de las remontadas más improbables de esa edición."},
  {e:"🧤",t:"René Higuita salió del área en Italia 1990 vs. Camerún, perdió el balón con Roger Milla y Colombia fue eliminada. Millones de colombianos lo recuerdan con mezcla de amor y dolor."},
  {e:"💔",t:"Andrés Escobar marcó el autogol que eliminó a Colombia en USA 1994. Fue asesinado 10 días después de volver al país. La tragedia sacudió al mundo del fútbol y marcó una generación."},
  {e:"💛",t:"Carlos 'El Pibe' Valderrama fue elegido entre los 125 mejores jugadores vivos de la historia por la FIFA (2004). Participó en 3 Copas del Mundo (1990, 1994, 1998) con su afro dorado inconfundible."},
  {e:"🏅",t:"James Rodríguez ganó el Botín de Oro en Brasil 2014 con 6 goles. Su volea vs. Uruguay fue elegida mejor gol del torneo. Tenía 22 años y el mundo entero supo su nombre en una semana."},
  {e:"🚀",t:"Brasil 2014 fue la mejor Copa de Colombia: llegó a cuartos de final por primera vez. Ganó a Grecia, Costa de Marfil, Japón y Uruguay antes de perder vs. Brasil sin Juan Guillermo Cuadrado ni Ospina lesionados."},
  {e:"⏱️",t:"Freddy Rincón marcó el 1-1 ante Alemania en el minuto 89 en Italia 1990, clasificando a Colombia a segunda ronda. La celebración en toda Colombia fue multitudinaria y espontánea."},
  {e:"🎩",t:"En eliminatorias rumbo a USA 1994, Colombia goleó 5-0 a Argentina en el Monumental de Buenos Aires. Tino Asprilla metió hat-trick. Pelé pronosticó a Colombia campeona del mundo. No resultó así."},
  {e:"🎲",t:"En Rusia 2018, Colombia cayó en penales con Inglaterra en octavos: Bacca y Uribe fallaron. Fue el 3° Mundial consecutivo que Colombia llegó a eliminación directa — una racha notable."},
  {e:"💪",t:"Colombia clasificó al Mundial 2026 en 2° lugar de CONMEBOL, la mejor eliminatoria histórica. 22 puntos, segunda solo detrás de Argentina. Luis Díaz, Jhon Durán y Lerma como pilares."},
  {e:"🦂",t:"El 'Gol del Escorpión' de Higuita vs. Inglaterra (1995) no fue en un Mundial sino en un amistoso en Wembley. Pero se convirtió en el gol más recordado y reproducido del fútbol colombiano."},
  {e:"🌟",t:"En Brasil 2014, Colombia tuvo 4 jugadores en el equipo ideal del torneo: James Rodríguez, Mario Yepes, Pablo Armero y David Ospina. La mejor representación de un solo país fuera del Top 4."},
  {e:"🌿",t:"Colombia es el país con más especies de aves del mundo: más de 1.900 — casi el 20% de todas las aves del planeta. Es un récord que ningún otro país puede igualar."},
  {e:"☕",t:"Colombia es el tercer mayor productor de café del mundo (tras Brasil y Vietnam) y el primero en café suave lavado. El 'Café de Colombia' es una denominación de origen protegida internacionalmente."},
  {e:"🌸",t:"Colombia es el segundo mayor exportador de flores del mundo, después de los Países Bajos. Más del 75% de las flores frescas que se venden en EEUU provienen de los cultivos colombianos de la Sabana de Bogotá."},
  {e:"📚",t:"Gabriel García Márquez, nacido en Aracataca, Magdalena, ganó el Nobel de Literatura en 1982. 'Cien años de soledad' (1967) se ha traducido a más de 46 idiomas y vendido más de 50 millones de copias."},
  {e:"🎨",t:"Fernando Botero desarrolló el 'boterismo': figuras de volúmenes exagerados que combinan crítica social con estética propia. Es el artista latinoamericano más reconocible mundialmente."},
  {e:"💃",t:"Shakira, nacida en Barranquilla, mezcla ritmos caribeños colombianos con influencias árabes de su herencia libanesa. Ha vendido más de 80 millones de discos y es la colombiana más escuchada en la historia."},
  {e:"🌊",t:"Colombia es el único país de América del Sur con costas en dos océanos: el Pacífico y el Caribe. Cada costa tiene su propia cultura, gastronomía y ecosistema completamente diferente."},
  {e:"💎",t:"Colombia produce entre el 70% y el 90% de las esmeraldas de mayor calidad del mundo. Las minas de Muzo y Chivor (Boyacá) son las más famosas y sus gemas las más valoradas por joyeros internacionales."},
  {e:"🌺",t:"Colombia tiene más de 4.000 especies de orquídeas — más que cualquier otro país del mundo. La Cattleya trianae es la flor nacional, conocida como 'la reina de las flores colombianas'."},
  {e:"🦅",t:"El Cóndor de los Andes, símbolo nacional de Colombia, tiene una envergadura de hasta 3.3 metros — el ave voladora más grande del planeta por peso corporal. Puede planear 200 km sin agitar las alas."},
  {e:"⚽",t:"La primera División Mayor del Fútbol Colombiano (Dimayor) fue fundada en 1948. El primer campeón fue Santa Fe. Millonarios, Nacional, América y Santa Fe concentran la mayoría de títulos históricos."},
  {e:"🏆",t:"Colombia ganó su primera Copa América en 2001 jugando como local. Derrotó a México 1-0 en la final con gol de Iván Córdoba. Fue el único título mayor de la selección hasta ese momento."},
  {e:"🎭",t:"El Carnaval de Barranquilla es Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO desde 2003. Con más de 4 días de festividades, es el segundo carnaval más grande del mundo."},
  {e:"🏙️",t:"Bogotá está a 2.600 m de altitud — una de las capitales más altas del planeta. Los equipos visitantes sienten el efecto del 'soroche' (mal de altura) en los primeros 20 minutos de partido."},
  {e:"👟",t:"Falcao García fue el máximo goleador histórico de la selección colombiana por muchos años. Una lesión de rodilla en enero de 2014 lo dejó fuera del Mundial que hubiera sido el punto máximo de su carrera."},
  {e:"🌴",t:"Colombia es el segundo país más biodiverso del planeta por kilómetro cuadrado, después de Brasil. Tiene 56.000 especies de plantas, 1.900 de aves, 600 de anfibios y 500 de reptiles catalogados."},
  {e:"🔵",t:"El Río Caño Cristales en la Serranía de la Macarena cambia de colores (rojo, amarillo, verde, azul, negro) entre julio y noviembre por la planta Macarenia clavigera. Lo llaman 'el río de los cinco colores'."},
  {e:"🏔️",t:"El Nevado del Ruiz es un volcán activo que en 1985 causó la tragedia de Armero: 23.000 muertos por un lahar de lodo. Fue la segunda mayor catástrofe volcánica del siglo XX después del Pinatubo."},
  {e:"🦛",t:"Los hipopótamos de Pablo Escobar se han multiplicado en Colombia: de los 4 originales de su hacienda Nápoles ahora hay más de 130 en el río Magdalena. Son el mayor problema de especie invasora del país."},
  {e:"🌟",t:"Luis Díaz del FC Liverpool es actualmente el jugador colombiano de mayor valor de mercado. En 2026 tendrá 29 años — en la plenitud de su carrera. Su padre fue secuestrado y liberado en 2022 durante un partido de Champions League."},
  {e:"🎵",t:"La cumbia es el ritmo más representativo de Colombia, nacido en la Costa Caribe de la mezcla de culturas africana, indígena y española. Hoy se baila en toda América Latina como símbolo de identidad regional."},
  {e:"🛶",t:"La Amazonía colombiana cubre más del 35% del territorio nacional. Leticia, su capital departamental, solo es accesible por río o avión — no existe carretera que la conecte con el resto del país."},
  {e:"🥇",t:"Colombia tiene 5 medallas de oro olímpicas en su historia hasta 2024. Mariana Pajón (BMX) y Óscar Figueroa (levantamiento de pesas) son los más emblemáticos. El boxeo y el judo también han dado medallas de oro."},
  {e:"📺",t:"'Betty la Fea' (RCN, 2000) fue adaptada en más de 70 países. La versión estadounidense 'Ugly Betty' ganó el Globo de Oro en 2007. Es la telenovela latinoamericana más exportada de la historia."},
  {e:"🔬",t:"Manuel Elkin Patarroyo desarrolló en 1987 la primera vacuna sintética contra la malaria (SPf66). La donó gratuitamente a la OMS. Es considerado uno de los científicos más importantes de América Latina."},
  {e:"🎭",t:"El Festival Internacional de Cine de Cartagena (FICCI), fundado en 1960, es el más antiguo de América Latina. Ha proyectado más de 6.000 películas de más de 100 países durante sus más de 60 ediciones."},
  {e:"🚴",t:"Egan Bernal se convirtió en 2019 en el primer latinoamericano en ganar el Tour de France, a los 22 años. Nairo Quintana ganó el Giro de Italia (2014) y la Vuelta a España (2016). Colombia domina el ciclismo de montaña."},
  {e:"🌿",t:"El Chocó colombiano tiene hasta 13.000 mm de precipitación anual — la región más lluviosa del mundo. Su biodiversidad es comparable a la Amazonia: más de 100 especies de mamíferos y 600 de aves solo en ese departamento."},
  {e:"⚡",t:"Colombia genera más del 65% de su electricidad con energía hídrica (represas). La represa de Ituango es la más grande del país y una de las 10 mayores hidroeléctricas de América Latina."},
  {e:"🌍",t:"Colombia fue el primer país latinoamericano en ingresar a la OCDE (2020), reconociendo sus avances institucionales, económicos y democráticos. Un hito diplomático para la región."},
  {e:"🎓",t:"La Universidad Nacional de Colombia, fundada en 1867, tiene más de 53.000 estudiantes en 9 sedes. Es consistentemente rankeada entre las 3 mejores universidades de América Latina."},
  {e:"🌊",t:"Las Islas del Rosario frente a Cartagena tienen el arrecife de coral más diverso del Caribe colombiano: más de 400 especies de peces, 50 de coral y 5 de manglares en un área marina protegida."},
  {e:"🧘",t:"La Ciudad Perdida (Teyuna) en la Sierra Nevada de Santa Marta tiene unos 1.500 años de antigüedad — 650 años más vieja que Machu Picchu. Fue redescubierta por huaqueros en 1972 y abierta al turismo en 1984."},
  {e:"🎸",t:"Carlos Vives modernizó el vallenato en los 90, fusionándolo con rock y pop. Ha ganado 9 Grammy Latinos — el colombiano con más premios en la historia. 'La Bicicleta' con Shakira fue el tema del verano 2016."},
  {e:"🦋",t:"Colombia tiene más de 3.200 especies de mariposas — la mayor diversidad del planeta. El Parque Nacional Amacayacu en el Amazonas es uno de los mejores lugares del mundo para avistamiento de lepidópteros."},
  {e:"⛽",t:"Ecopetrol, empresa estatal colombiana, es una de las 50 compañías petroleras más grandes del mundo. Colombia produce alrededor de 750.000 barriles diarios de crudo — el 6° mayor productor de América del Sur."},
  {e:"🏅",t:"Colombia fue sede de los Juegos Panamericanos de Cali en 1971, los primeros en territorio colombiano, y del World Games en 2013 — única ciudad latinoamericana en albergar ese evento."},
  {e:"🎯",t:"En la Copa América 2001, Colombia fue campeona invicta: 7 partidos, 7 victorias, 11 goles a favor y 1 en contra. La final 1-0 vs. México con gol de cabeza de Iván Córdoba al minuto 65."},
  {e:"🌺",t:"El Eje Cafetero colombiano (Caldas, Risaralda, Quindío) es Patrimonio Cultural de la Humanidad por la UNESCO desde 2011. Es el único paisaje cultural de América reconocido principalmente por su actividad agrícola."},
  {e:"🚂",t:"El Ferrocarril de Antioquia, construido entre 1875 y 1929 sobre terreno montañoso, fue considerado una de las obras de ingeniería más complejas del siglo XIX en el continente americano."},
  {e:"🤸",t:"Colombia tiene la mayor densidad de accidentes geográficos de América del Sur: atravesada por 3 cordilleras, con costas en 2 océanos, Amazonía, Llanos Orientales y la Guajira desértica. 6 regiones naturales completamente distintas."},
  {e:"🎺",t:"El vallenato fue declarado Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO en 2015. Carlos Vives describió el Festival de la Leyenda Vallenata en Valledupar como 'el Woodstock colombiano'."},
  {e:"🦜",t:"Colombia tiene el mayor número de especies de colibríes del mundo: más de 160 — casi la mitad de todas las especies conocidas. El colibrí pico de espada (Ensifera ensifera) tiene el pico más largo en proporción a su cuerpo de cualquier ave."},
  {e:"💰",t:"Colombia es el mayor exportador mundial de rosas cortadas de tallo largo. La Feria de las Flores de Medellín (agosto) celebra esta industria: el Desfile de Silleteros es considerado el evento floral más grande del mundo."},
  {e:"🌐",t:"Colombia clasifica al Mundial 2026 en el Grupo K junto a Portugal, DR Congo y Uzbekistán. Es el grupo con mayor diversidad geográfica: Europa, África, Asia Central y Sudamérica en un mismo chapa."},
  {e:"🏆",t:"En el Mundial de Francia 1998, Colombia perdió los 3 partidos del grupo (vs. Rumania, Inglaterra y Túnez). Fue la primera y única vez que no ganó ni empató en una fase de grupos mundialista."},
  {e:"📍",t:"Los 3 goles de Colombia en Francia 1998 los marcaron Preciado, De Ávila y Leider Preciado — pero no alcanzaron. La generación de Valderrama salió por la puerta de atrás de su último Mundial."},
  {e:"🎯",t:"Jhon Durán del Aston Villa es la mayor apuesta de Colombia para el Mundial 2026. Con solo 21 años en el torneo, es el delantero más joven y potente de la historia reciente de la selección."},
];

// ═══════════════════════════════════════════════════════════════
// ⚽ PAÍSES — Datos de las selecciones participantes
// ═══════════════════════════════════════════════════════════════
const FACTS_PAISES = [
  {e:"🇦🇷",t:"Messi ganó su primer Mundial a los 35 años en Qatar 2022. Marcó en la final, en la prórroga y en los penales. Superó a todos los que decían que sin el trofeo no podía ser el GOAT."},
  {e:"🇲🇦",t:"Marruecos fue la primera selección africana y árabe en llegar a semifinales en Qatar 2022. Eliminó a España y Portugal. Youssef En-Nesyri y Achraf Hakimi se convirtieron en héroes continentales."},
  {e:"🇲🇽",t:"México lleva 7 Mundiales seguidos cayendo en octavos de final. Esta maldición del 'quinto partido' se repite desde 1994. En 2026 juega en casa — en Ciudad de México, Guadalajara y Monterrey."},
  {e:"🇰🇷",t:"Corea del Sur llegó a semis del Mundial 2002 como co-anfitrión, eliminando a España e Italia en partidos muy polémicos. Son la única selección asiática en llegar a semifinales de un Mundial."},
  {e:"🇳🇱",t:"Países Bajos es el único país en perder tres finales mundialistas sin ganar ninguna: 1974 (vs. Alemania), 1978 (vs. Argentina) y 2010 (vs. España). La 'naranja mecánica' siempre llega, nunca corona."},
  {e:"🇺🇾",t:"Uruguay ganó dos Mundiales (1930, 1950) con apenas 3.5 millones de habitantes. Es la nación con más títulos internacionales per cápita del fútbol — también tiene 15 Copas América, un récord."},
  {e:"🇯🇵",t:"Japón eliminó a Alemania y España en la fase de grupos de Qatar 2022, remontando en ambos partidos desde el descanso. Es la primera nación en vencer a dos ex campeones en el mismo Mundial."},
  {e:"🇳🇴",t:"Noruega venció a Brasil 2-1 en la fase de grupos de Francia 1998 — la última participación noruega antes de 2026. Brasil era el campeón vigente. Kjetil Rekdal anotó el gol de la victoria de penal."},
  {e:"🇨🇼",t:"Curazao debuta en el Mundial 2026 con apenas 153.000 habitantes — el 2° país más pequeño del torneo. Geográficamente es el Caribe, pero políticamente es parte del Reino de los Países Bajos."},
  {e:"🇪🇸",t:"España ganó su único Mundial en Sudáfrica 2010 con el gol de Iniesta en la prórroga de la final. Solo marcaron 8 goles en 7 partidos — el equipo más 'sólido' que jamás ganó una Copa del Mundo."},
  {e:"🇩🇪",t:"Alemania tiene 8 finales mundialistas y 4 títulos (1954, 1974, 1990, 2014). Nunca fue eliminada antes de cuartos en sus primeras 16 participaciones. En Qatar 2022 cayó en grupos por primera vez desde 1938."},
  {e:"🇫🇷",t:"Francia ganó el Mundial 1998 en casa y el 2018 en Rusia con Mbappé a los 19 años. En 2022 llegó a la final pero perdió vs. Argentina en penales. Ninguna nación en la era moderna ha sido tan constante."},
  {e:"🇵🇹",t:"Portugal nunca ha ganado el Mundial. En 2024, Cristiano Ronaldo llegó a los 34 goles en EUROS — pero en Mundiales su máximo fue el 3° puesto en 2006 con Figo, Deco y Pauleta. Ahora Rafa Leão manda."},
  {e:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",t:"Inglaterra ganó su único Mundial en 1966 jugando de local. El gol del 3-2 de Geoff Hurst en la prórroga sigue siendo debatido — la pelota rebotó en el travesaño y no queda claro si cruzó la línea."},
  {e:"🇧🇷",t:"Brasil tiene el récord de más títulos mundialistas (5): 1958, 1962, 1970, 1994 y 2002. En cada una de esas ediciones, al menos un jugador ganó también el Balón de Oro del torneo."},
  {e:"🇨🇦",t:"Canadá co-organiza el Mundial 2026 y clasifica como selección por primera vez desde 1986. Alphonso Davies del Bayern Munich nació en un campo de refugiados en Ghana. Es el jugador más rápido del mundo."},
  {e:"🇶🇦",t:"Qatar fue el primer anfitrión en ser eliminado en la fase de grupos de su propio Mundial (2022). Aun así, la organización del torneo fue calificada como técnicamente perfecta por la FIFA."},
  {e:"🇸🇦",t:"Arabia Saudita fue la primera selección árabe en vencer al campeón vigente en un Mundial: Argentina 2-1 en Qatar 2022. El gobierno declaró festivo al día siguiente. Argentina terminó siendo campeona."},
  {e:"🇨🇭",t:"Suiza es el país europeo más regular del fútbol sin un título: clasificó a 13 de los últimos 14 Mundiales. Su neutralidad histórica no se traslada al campo: defiende con solidez y sorprende."},
  {e:"🇨🇿",t:"Checoslovaquia llegó a dos finales mundialistas (1934 y 1962), perdiendo ambas. Como República Checa, llegó a cuartos de final en 2006 con Rosický, Koller y Poborský. La historia les debe una final."},
  {e:"🇹🇷",t:"Türkiye logró su mejor Mundial en 2002: 3° puesto con Şükür, Nihat y el portero Rüştü Reçber (elegido mejor del torneo). Fue su primera aparición en semis de un Mundial. En 2026 busca repetirlo."},
  {e:"🇸🇳",t:"Senegal debutó en el Mundial 2002 venciendo a Francia 1-0 y llegando a cuartos de final. En Qatar 2022 fue eliminado en octavos por Inglaterra. Tiene la generación más talentosa de su historia con Mané y Dia."},
  {e:"🇦🇺",t:"Australia llegó a octavos en Qatar 2022 eliminando a Dinamarca. Mat Ryan fue el héroe en penales vs. Perú en el repechaje. Los Socceroos se han convertido en un equipo respetado globalmente."},
  {e:"🇵🇾",t:"Paraguay tiene la mejor rascha clasificatoria de su historia reciente: clasificó invicto a 2026. Su arquero Gatito Fernández es uno de los mejores de la CONMEBOL. Nunca ha ganado una Copa América."},
  {e:"🇮🇶",t:"Iraq clasifica al Mundial 2026 por primera vez en su historia. Su fútbol renació después de décadas de conflicto bélico. Es uno de los debuts más simbólicos del torneo en términos de resiliencia histórica."},
  {e:"🇿🇦",t:"Sudáfrica organizó el primer Mundial en territorio africano en 2010. El vuvuzela, corneta plástica local, se convirtió en símbolo sonoro del torneo — amado y odiado por igual en todo el planeta."},
  {e:"🇧🇦",t:"Bosnia-Herzegovina clasifica al Mundial 2026 por segunda vez. En su debut en 2014, Edin Džeko y compañía vencieron a Irán y perdieron por poco ante Nigeria. Era un país de apenas 23 años de existencia."},
  {e:"🇭🇹",t:"Haití participó en el Mundial 1974 — su única aparición hasta ahora. Fue el primer equipo caribeño en clasificar. Manno Sanon marcó el primer gol caribeño en la historia del Mundial. 52 años después, vuelven."},
  {e:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",t:"Escocia fue uno de los equipos del primer partido internacional de fútbol (vs. Inglaterra, 1872, empate 0-0). Es la única selección en clasificar a 8 Mundiales sin pasar jamás de la fase de grupos."},
  {e:"🇨🇮",t:"Costa de Marfil tuvo a Didier Drogba como su leyenda absoluta. En sus 3 apariciones mundialistas (2006, 2010, 2014) nunca pasó de grupos, siempre cayendo en el 'grupo de la muerte'. Un destino injusto."},
  {e:"🇪🇨",t:"Ecuador ha clasificado a 4 Mundiales (2002, 2006, 2014, 2026). Carlos Tenorio fue su primer gran goleador mundialista. Enner Valencia marcó en 2014 y 2022. En 2026 llega con una de sus mejores generaciones."},
  {e:"🇸🇪",t:"Suecia es la única selección escandinava en llegar a una final del Mundial (1958, perdió vs. Brasil 5-2). También fue 3° en 1994 con Tomas Brolin y Kennet Andersson. Zlatan nunca llegó a semis."},
  {e:"🇹🇳",t:"Túnez fue el primer equipo africano en ganar un partido mundialista: venció a México 3-1 en Argentina 1978. En Qatar 2022 venció a Francia 1-0 pero ya estaba eliminado. Su historia es de momentos aislados."},
  {e:"🇳🇿",t:"Nueva Zelanda en el Mundial 2010 empató sus tres partidos (con Italia, Eslovaquia y Paraguay) sin ganar pero sin perder. Fue el único equipo invicto que no avanzó de grupos en la historia del Mundial."},
  {e:"🇬🇭",t:"Ghana fue el primer equipo subsahariano en llegar a cuartos de final (2010). Luis Suárez detuvo un gol con la mano en el último minuto — Asamoah Gyan falló el penal. Ghana perdió en penales. África lloró."},
  {e:"🇵🇦",t:"Panamá debutó en un Mundial en Rusia 2018. Perdió sus 3 partidos pero Felipe Baloy marcó el primer gol panameño mundialista vs. Inglaterra. Todo el país se paralizó durante 3 minutos de celebración."},
  {e:"🇭🇷",t:"Croacia, con 4 millones de habitantes, llegó a la final del Mundial 2018 y al 3er puesto en 2022. Luka Modrić ganó el Balón de Oro 2018 rompiendo el duopolio Messi-Ronaldo de 10 años."},
  {e:"🇯🇴",t:"Jordania clasifica al Mundial 2026 por primera vez en su historia, eliminando a Australia en el repechaje. Es el debut más celebrado en el mundo árabe después de Marruecos 2022."},
  {e:"🇩🇿",t:"Argelia fue injustamente eliminada del Mundial 1982 en el 'Anschluss de Gijón': venció a Alemania 2-1 pero fue eliminada por el resultado pactado entre alemanes y austriacos en el último partido."},
  {e:"🇦🇹",t:"Austria fue semifinalista del Mundial 1934. Su 'Wunderteam' de los años 30 con Matthias Sindelar era considerado el mejor de Europa. Hoy con David Alaba y Marcel Sabitzer busca volver a esa época dorada."},
  {e:"🇨🇩",t:"La República Democrática del Congo (ex Zaire) participó en el Mundial 1974, siendo el primer equipo del África subsahariana en una Copa del Mundo. Perdió 9-0 ante Yugoslavia en su peor derrota histórica."},
  {e:"🇺🇿",t:"Uzbekistán debuta en el Mundial 2026 por primera vez como nación independiente (desde 1991). Su fútbol creció rápidamente en los últimos 15 años con la Liga Pro y las canteras modernas de Tashkent."},
  {e:"🇨🇻",t:"Cabo Verde, archipiélago de 560.000 habitantes en el Atlántico, clasifica al Mundial 2026. La mayoría de sus jugadores nacieron o crecieron en la diáspora de Portugal, Francia y Países Bajos."},
  {e:"🇮🇷",t:"Irán es la selección asiática con más participaciones mundialistas (6). En Qatar 2022 venció a Gales pero cayó ante EEUU en el partido decisivo. El partido más político del torneo por el contexto interno."},
  {e:"🇷🇺",t:"Rusia organizó el Mundial 2018 con éxito organizativo reconocido mundialmente. Llegó a cuartos de final bajo el impulso de la localía con el portero Akinfeev como héroe. Su participación en 2026 está prohibida."},
  {e:"🇧🇪",t:"Bélgica tuvo la 'Generación Dorada': De Bruyne, Hazard, Lukaku, Courtois, Carrasco. En Rusia 2018 llegó al 3er puesto — su mejor resultado histórico. En Qatar 2022 fue eliminada en grupos prematuramente."},
  {e:"🇲🇽",t:"México fue sede de dos Mundiales (1970 y 1986). El estadio Azteca de Ciudad de México es el único en acoger dos finales en la historia. En 2026, México recibe de nuevo partidos incluyendo un cuarto de final."},
  {e:"🇺🇸",t:"EEUU fue co-organizador del Mundial 1994 y terminó en octavos de final. En 2026 vuelve como co-anfitrión. Christian Pulisic es la mayor estrella de la historia del fútbol estadounidense — juega en el AC Milan."},
  {e:"🇨🇴",t:"Colombia, en el Grupo K junto a Portugal, tiene el partido de apertura más atractivo del grupo: Colombia vs. Portuga — la generación de Lucho Díaz vs. la de Rafael Leão. Dos estilos opuestos de entender el fútbol."},
  {e:"🇦🇷",t:"Argentina ganó 3 Mundiales (1978, 1986, 2022) y perdió 3 finales (1930, 1990, 2014). Ningún país ha llegado a más finales (6) sin que sea Brasil. Es la selección con más historia en las instancias definitorias."},
  {e:"🇯🇵",t:"Japón ha clasificado a 8 Mundiales consecutivos desde 1998, el mayor racha activa de Asia. Su academia de fútbol produce regularmente jugadores para las mejores ligas del mundo: Bundesliga, Premier y Serie A."},
  {e:"🇳🇴",t:"Erling Haaland del Manchester City marcó 52 goles en la temporada 2022-23 — el más alto en la historia de la Premier League. En el Mundial 2026 tendrá 25 años. La presión sobre Noruega es histórica."},
  {e:"🇨🇭",t:"Suiza vence regularmente a potencias pero nunca llega lejos en Mundiales. En Qatar 2022 eliminó a Serbia pero cayó vs. Portugal 6-1. Tiene el mejor índice de 'partidos ganados en fase de grupos sin avanzar' del mundo."},
  {e:"🇸🇦",t:"El fútbol saudí creció exponencialmente desde 2023: Ronaldo, Benzema, Neymar y Kanté juegan en la Saudi Pro League. El impacto en la selección nacional aún está por verse en 2026."},
  {e:"🇬🇭",t:"Ghana tiene la mayor cantidad de jugadores europeos por naturalización en su selección: más del 60% nació fuera del país. Es un modelo de 'diáspora-selección' que también usan Senegal, Marruecos y Costa de Marfil."},
  {e:"🇪🇨",t:"Ecuador fue descalificada de 2022 por alineación indebida (Byron Castillo), pero la FIFA la mantuvo y participó. En 2026 llega sin ese escándalo y con Kendry Páez, de 17 años, como su joya más brillante."},
  {e:"🇨🇦",t:"El 'milagro de Catar': Canadá clasificó al Mundial 2022 por primera vez en 36 años con Jonathan David (Lille), Alphonso Davies (Bayern) y Stephen Eustáquio (Porto). En 2026, juegan en casa y con experiencia."},
  {e:"🇸🇪",t:"Suecia fue el país que reveló a Zlatan Ibrahimović al mundo. Zlatan marcó 62 goles en la selección pero nunca clasificó a un Mundial con ella después de 2006. Su sombra sigue sobre el fútbol sueco."},
  {e:"🇫🇷",t:"Francia tiene el 'efecto Mbappé': en Qatar 2022, Kylian marcó 8 goles incluyendo un hat-trick en la final. Perdieron en penales vs. Argentina. En 2026 tendrá 27 años y estará en la plenitud absoluta."},
  {e:"🇵🇹",t:"Portugal tiene el récord histórico de más goles en una eliminatoria europea (29 en clasificación para 2010). Ronaldo sigue siendo el máximo goleador de selecciones internacionales (128+). Pero el Mundial sigue sin llegar."},
];

// ═══════════════════════════════════════════════════════════════
// 🧠 CULTURA GENERAL — Historia, arte, música, geografía
// ═══════════════════════════════════════════════════════════════
const FACTS_CULTURA = [
  {e:"🌌",t:"El universo tiene 13.800 millones de años. La Tierra, 4.500 millones. El Sol lleva encendido solo un tercio de la historia del cosmos — y le quedan otros 5.000 millones antes de convertirse en gigante roja."},
  {e:"🧠",t:"El cerebro humano tiene ~86.000 millones de neuronas conectadas por más de 100 billones de sinapsis. Tiene más conexiones que estrellas hay en la Vía Láctea. Es el objeto más complejo del universo conocido."},
  {e:"🏔️",t:"Si el Everest se midiera desde el centro de la Tierra, no sería la montaña más alta: el volcán Chimborazo (Ecuador) sobresale más desde el centro terrestre por el abultamiento ecuatorial."},
  {e:"🐙",t:"Los pulpos tienen tres corazones, sangre azul y nueve cerebros: uno central y uno por cada brazo. Cada brazo puede actuar con cierta autonomía. Son el punto de referencia de la biología de la 'otredad'."},
  {e:"🎵",t:"'We Will Rock You' de Queen fue diseñada para ser cantada por multitudes sin instrucción previa: golpe-golpe-palmada es intuitivo para cualquier ser humano. Funcionó en el primer estadio donde se tocó."},
  {e:"🧊",t:"La Antártida contiene el 70% del agua dulce del planeta. Si se derritiera, el nivel del mar subiría unos 60 metros — las costas de Barranquilla, Miami, Tokio y Amsterdam quedarían bajo el agua."},
  {e:"🦕",t:"Las aves son dinosaurios: son terópodos que sobrevivieron la extinción masiva del Cretácico-Paleógeno. El pollo que comés es más 'dinosaurio' en términos evolutivos que cualquier Velociraptor fosilizado."},
  {e:"📱",t:"El smartphone más básico de 2024 es millones de veces más poderoso que las computadoras que la NASA usó para la misión Apollo 11 en 1969. Y cabe en tu bolsillo."},
  {e:"🗺️",t:"Más del 50% de la humanidad vive dentro de un círculo trazado alrededor del sudeste asiático (incluyendo China, India, Bangladesh e Indonesia). La mitad del planeta en una región relativamente compacta."},
  {e:"🎭",t:"Shakespeare inventó más de 1.700 palabras del inglés moderno: 'bedroom', 'generous', 'lonely', 'obscene', 'fashionable'. Cuando no encontraba la palabra que necesitaba para sus obras, la creaba."},
  {e:"🦠",t:"El cuerpo humano tiene más células bacterianas que propias: ~38 billones de bacterias vs. ~30 billones de células humanas. Eres más bacteria en número de células. Son parte esencial de tu salud."},
  {e:"🌊",t:"Solo hemos explorado el 20% del fondo del océano. La Fosa de las Marianas tiene 11 km de profundidad — el Everest cabe dentro con 2 km de sobra. Sabemos más de la superficie de Marte que de nuestros propios abismos."},
  {e:"🎬",t:"'Lo que el viento se llevó' (1939), ajustando por inflación, sigue siendo la película más taquillera de la historia. 'Avatar' (2009) solo la supera en dólares nominales. El cine viejo todavía gana."},
  {e:"🔢",t:"En inglés, no aparece la letra 'a' hasta el número 1.000 (one thousand). Si escribieras todos los números del 1 al 999 en inglés, ninguno contendría la letra más usada del alfabeto."},
  {e:"🏛️",t:"La Biblioteca de Alejandría no fue destruida en un solo incendio — ese es un mito. Decayó durante siglos por falta de financiación. Roma quemó parte, pero ya estaba en declive 200 años antes de eso."},
  {e:"🧲",t:"El imán más poderoso del mundo está en el National High Magnetic Field Laboratory de Florida: 45 Tesla. Es 900.000 veces más fuerte que el campo magnético terrestre. Podría detener un automóvil en movimiento."},
  {e:"🐘",t:"Los elefantes son los únicos animales, además de los humanos, conocidos por practicar rituales funerarios: visitan los huesos de sus muertos, los tocan con la trompa y permanecen en silencio durante minutos."},
  {e:"🌍",t:"África es el continente más grande si lo midieras correctamente: los mapas tradicionales (Mercator) lo distorsionan. África cabe dentro de ella: EEUU, China, India, Europa Occidental, Japón y más."},
  {e:"🎭",t:"El teatro griego antiguo tenía actores exclusivamente masculinos. Los personajes femeninos eran interpretados por hombres con máscaras y almohadillas. La máscara también amplificaba la voz en el anfiteatro."},
  {e:"🎸",t:"El disco de vinilo fue reemplazado por el cassette, que fue reemplazado por el CD, que fue reemplazado por el streaming. Sin embargo, las ventas de vinilo en 2023 superaron a las de CDs por primera vez desde 1987."},
  {e:"🦁",t:"Los leones son los únicos felinos sociales del mundo — todos los demás (tigres, leopardos, pumas) son solitarios. Una manada de leones puede coordinar estrategias de caza más complejas que cualquier otro felino."},
  {e:"🌐",t:"El Internet fue concebido en 1969 como ARPANET, una red militar de EEUU con solo 4 nodos. El primer 'mensaje' enviado fue 'lo' — el sistema colapsó antes de completar 'login'. Así empezó todo."},
  {e:"🏺",t:"La civilización más antigua conocida es la sumeria (Mesopotamia, actual Iraq), de hace ~5.000 años. Inventaron la escritura cuneiforme, la rueda, el calendario de 360 días y el primer sistema legal escrito."},
  {e:"🎻",t:"El Stradivarius más caro del mundo ('Vieuxtemps', 1741) fue vendido en 2012 por ~16 millones de dólares. Nadie ha podido replicar científicamente el sonido de Stradivari — el secreto puede estar en el barniz."},
  {e:"🧬",t:"El ADN humano, si se estirara, mediría 2 metros. Cada célula de tu cuerpo contiene 2 metros de ADN doblado en un espacio de 6 micras. En todo tu cuerpo, el ADN sumado alcanzaría el Sol y regresaría 300 veces."},
  {e:"🌋",t:"El Monte Olimpo en Marte tiene 22 km de altura — casi 3 veces el Everest. Si estuvieras parado en su cima, la atmósfera marciana sería tan delgada que técnicamente estarías en el espacio."},
  {e:"🎯",t:"El inventor de la dinamita, Alfred Nobel, se quedó horrorizado cuando leyó su propio obituario publicado por error (confundieron al hermano muerto). Esa lectura lo llevó a crear los Premios Nobel en su testamento."},
  {e:"🐋",t:"Las ballenas azules son el animal más grande que ha existido en la historia de la Tierra — incluyendo a todos los dinosaurios. Su corazón pesa 600 kg y late solo 8-10 veces por minuto."},
  {e:"🔭",t:"La NASA encontró en la Antártida en 1996 un meteorito marciano (ALH84001) que podría contener microfósiles de vida antigua. El debate científico sigue abierto — nadie lo ha confirmado ni descartado definitivamente."},
  {e:"🎨",t:"La Mona Lisa fue robada del Louvre en 1911 y recuperada 2 años después. Antes del robo era relativamente desconocida para el gran público. El escándalo la convirtió en la pintura más famosa del mundo."},
  {e:"🦈",t:"Los tiburones son más antiguos que los árboles: existen hace 450 millones de años; los árboles solo hace 350 millones. Han sobrevivido 5 extincionas masivas, incluyendo la que eliminó a los dinosaurios."},
  {e:"🌡️",t:"El registro de temperatura más alta en la Tierra fue 56.7°C en Death Valley, California (1913). El más frío fue -89.2°C en la estación Vostok, Antártida (1983). Un planeta de extremos coexistiendo."},
  {e:"🛕",t:"La Gran Pirámide de Giza fue el edificio más alto del mundo durante 3.800 años (hasta 1311 con la catedral de Lincoln). Fue construida con una precisión de 1/10 de milímetro en sus ángulos. Sin GPS, sin computadoras."},
  {e:"🎙️",t:"El idioma con más hablantes nativos del mundo es el mandarín chino (950 millones), seguido del español (480 millones). El inglés tiene solo 380 millones de hablantes nativos, pero es la lingua franca global."},
  {e:"🧪",t:"La aspirina fue el primer fármaco sintético de la historia moderna (1899, Bayer). Originalmente fue aislada del sauce blanco. Hoy se consumen más de 40.000 millones de tabletas por año en todo el planeta."},
  {e:"🌈",t:"Los arcoíris son círculos completos — no arcos. Solo parecen arcos porque el suelo corta la parte inferior. Desde un avión, los arcoíris se ven completos. Nunca puedes llegar a su base porque se mueve con vos."},
  {e:"🐝",t:"Las abejas han existido por 130 millones de años — coevolucionaron con las flores. Una colmena tiene entre 20.000 y 80.000 abejas. La abeja reina puede poner hasta 2.000 huevos por día. Una máquina biológica perfecta."},
  {e:"🏗️",t:"La muralla china no es visible desde el espacio — ese es un mito extendido. Su ancho (~5 m) es demasiado estrecho para ser distinguido desde la órbita. El primer astronauta chino (Yang Liwei, 2003) lo confirmó."},
  {e:"🎭",t:"Existen solo 3 países en el mundo sin ejército propio: Costa Rica, Islandia y Panamá. Costa Rica abolió su ejército en 1948 y redirigió el presupuesto a educación y salud. Su IDH es el más alto de Centroamérica."},
  {e:"🎓",t:"La Universidad de Bolonia (Italia, 1088) es la más antigua del mundo aún en funcionamiento. La de Oxford (1096) y la de Cambridge (1209) le siguen. Las universidades medievales ya tenían huelgas y protestas estudiantiles."},
  {e:"🌿",t:"El árbol más viejo del mundo es un Pinus longaeva de 5.066 años llamado Matusalén, en California. Su ubicación exacta es secreta para protegerlo. Estaba vivo antes de que se construyera la Gran Pirámide."},
  {e:"🐬",t:"Los delfines tienen nombres individuales: se llaman entre sí con silbidos específicos para cada individuo. Son los únicos animales no humanos conocidos en usar 'nombres' como nosotros entendemos el concepto."},
  {e:"📖",t:"El libro más vendido de la historia (después de la Biblia) es Don Quijote de la Mancha (1605, Cervantes), con más de 500 millones de copias. El segundo lugar varía según la fuente, pero suele ser 'El Principito'."},
  {e:"🌙",t:"La Luna se aleja de la Tierra ~3.8 cm por año. En el tiempo de los dinosaurios, la Luna estaba mucho más cerca y los días solo duraban 22 horas. En miles de millones de años, los días serán más largos."},
  {e:"🎸",t:"El músico más influyente del siglo XX, según los críticos, es habitualmente Robert Johnson — un guitarrista de blues de los años 30 que grabó solo 29 canciones. Sin él, no existirían los Rolling Stones ni Led Zeppelin."},
  {e:"🏊",t:"El Mar Muerto tiene tanta sal (34%) que nadie puede hundirse: el cuerpo flota automáticamente. Es el punto más bajo de la superficie terrestre (-430 m sobre el nivel del mar) y se encoge ~1 metro por año."},
  {e:"🤝",t:"El apretón de manos tiene más de 3.000 años de historia. En la antigua Roma era una demostración de que no portabas armas: se tomaba el antebrazo del otro para verificarlo. La variante actual (mano con mano) es del Medioevo."},
  {e:"🦋",t:"La metamorfosis de una mariposa no es gradual: dentro de la crisálida, la oruga se disuelve completamente en una sopa de células y se reorganiza desde cero. Es literalmente un organismo diferente el que emerge."},
  {e:"🔐",t:"La criptografía cuántica hace imposible el espionaje sin dejar rastro: cualquier intento de interceptar un mensaje cuántico altera el mensaje. Es la primera forma de comunicación matemáticamente imposible de interceptar."},
  {e:"🌊",t:"El Pacífico es más grande que toda la tierra emergida del planeta junta. Cubre el 32% de la superficie total de la Tierra. En su punto más ancho (Manila a Colombia) mide 19.800 km — más que la circunferencia de la Tierra."},
  {e:"🎭",t:"Leonardo da Vinci era zurdo y escribía en espejo (de derecha a izquierda, invertido). Era también vegetariano, músico, ingeniero de guerra, anatomista, botánico y urbanista. Renacentista en el sentido más literal."},
  {e:"🧩",t:"El ajedrez fue inventado en India hace ~1.500 años (juego chaturanga). La computadora venció al campeón mundial por primera vez en 1997 (Deep Blue vs. Kasparov). Hoy ningún humano puede vencer a los mejores programas de IA."},
  {e:"🦅",t:"El águila calva (símbolo de EEUU) estuvo a punto de extinguirse en 1963: solo quedaban 417 parejas reproductoras. Gracias a la prohibición del DDT y los programas de conservación, hoy hay más de 300.000 en Norteamérica."},
  {e:"🌃",t:"La ciudad más antigua aún habitada del mundo es Jericó (Palestina), con más de 11.000 años de historia. Damasco (Siria) también compite por el título. Las guerras modernas amenazan estos legados milenarios."},
  {e:"🎪",t:"El número π (pi) ha sido calculado hasta 105 billones de dígitos decimales (record 2024). Para calcular la circunferencia del universo observable con error menor a un protón, solo necesitas 39 dígitos de π."},
  {e:"🚀",t:"En el espacio no existe el 'arriba' ni el 'abajo'. Los astronautas de la ISS no sienten la gravedad porque están en caída libre constante alrededor de la Tierra — ese es el secreto de la ingravidez orbital."},
  {e:"🧠",t:"El coeficiente intelectual (IQ) promedio ha aumentado ~3 puntos por década desde 1930 en los países desarrollados — el 'Efecto Flynn'. Probablemente por mejor nutrición, educación y estimulación cognitiva temprana."},
  {e:"💡",t:"Thomas Edison no 'inventó' la bombilla — la mejoró. Había más de 20 diseños previos. Su aporte fue el filamento de carbono que duraba más tiempo y el sistema de distribución eléctrica doméstica. El negocio fue su genio."},
  {e:"🌺",t:"Las flores de cerezo japonesas (sakura) duran solo 1-2 semanas. En Japón, la tradición del 'hanami' (ver los cerezos florecer) existe hace 1.200 años. Los pronósticos del sakura son tan seguidos como los del tiempo."},
  {e:"🎭",t:"El Festival de Edimburgo (Escocia, 1947) es el festival de artes escénicas más grande del mundo: 25.000 actuaciones en 3 semanas, 3 millones de entradas vendidas. Nació como respuesta cultural a la Segunda Guerra Mundial."},
  {e:"🌍",t:"El idioma con más palabras del mundo es el inglés: más de 600.000 en el diccionario Oxford. El español tiene unas 93.000 palabras registradas. Pero el lenguaje con más sonidos distintos es el !Xóõ del Kalahari, con 141 fonemas."},
];

// ═══════════════════════════════════════════════════════════════
// 🔬 CIENCIA — Física, química, astronomía, biología, ecología, economía
// ═══════════════════════════════════════════════════════════════
const FACTS_CIENCIA = [
  // ── FÍSICA ──────────────────────────────────────────────────
  {e:"⚡",t:"Un rayo alcanza 30.000°C — aproximadamente 5 veces la temperatura de la superficie del Sol. Dura solo 0.2 segundos pero libera la energía suficiente para mantener un foco de 100W encendido durante 3 meses."},
  {e:"🕰️",t:"Los relojes atómicos de los satélites GPS van más rápido que los terrestres por la relatividad general (menos gravedad = tiempo más rápido). Sin corrección relativista, el GPS se desalinearía ~11 km por día."},
  {e:"🌑",t:"Si el Sol se convirtiera en agujero negro mañana, la Tierra seguiría orbitando exactamente igual. Los agujeros negros no 'aspiran' — tienen la misma gravedad que la masa original. Solo cambia el tamaño."},
  {e:"🔵",t:"El universo se está expandiendo más rápido que la velocidad de la luz. Pero no viola la relatividad: no son objetos moviéndose en el espacio — es el espacio mismo el que se estira entre ellos."},
  {e:"🌡️",t:"El cero absoluto (-273.15°C) es la temperatura más baja posible: en ese punto las partículas casi dejan de moverse. El espacio intergaláctico está a -270°C — casi pero no del todo el cero absoluto."},
  {e:"☀️",t:"Un fotón de luz tarda 100.000 años en viajar desde el núcleo del Sol hasta su superficie — rebotando entre partículas. Luego tarda solo 8 minutos en llegar a la Tierra. El viaje interior es el verdadero épico."},
  {e:"🎾",t:"Un electrón no tiene tamaño definido — matemáticamente es puntual (sin extensión). Lo que percibimos como materia 'sólida' es en realidad campo electromagnético. Nada que tocas está realmente 'tocando' otra cosa."},
  {e:"🌊",t:"El efecto túnel cuántico permite que partículas atraviesen barreras que clásicamente serían infranqueables. Sin él, la fusión nuclear del Sol sería imposible. El Sol brilla gracias a la mecánica cuántica."},
  {e:"🔊",t:"El sonido no puede viajar en el vacío porque necesita un medio (moléculas) para propagarse. En el espacio, no existe el sonido. 'In space, no one can hear you scream' es física correcta, no solo marketing."},
  {e:"🪐",t:"El tiempo pasa más lento cerca de masas grandes. Un reloj en la superficie de un agujero negro (si pudiera existir) casi se detendría visto desde lejos. Vivir cerca del núcleo terrestre te hace envejecer muy levemente más lento."},
  {e:"💥",t:"La energía liberada por el Sol en un segundo (3.8 × 10²⁶ Joules) podría suministrar electricidad a toda la humanidad durante unos 750.000 años. Solo una fracción diminuta de esa energía llega a la Tierra."},
  {e:"🌀",t:"El experimento de la doble rendija demuestra que las partículas cuánticas viajan por 'todos los caminos posibles' simultáneamente hasta que son observadas. La realidad a escala cuántica desafía toda intuición clásica."},
  {e:"🔭",t:"La velocidad de la luz en el vacío es exactamente 299.792.458 m/s. Esa velocidad es constante para todos los observadores, independientemente de su velocidad. Esta rareza es la base de toda la relatividad especial."},
  {e:"⚖️",t:"La materia oscura representa el 27% del universo, la energía oscura el 68%. La materia 'normal' (todo lo que vemos, estrella, planeta, galaxia) es solo el 5% del universo. Somos espuma en un océano desconocido."},
  {e:"🌐",t:"Si llenases el Sol con esferas del tamaño de la Tierra, cabrían 1.300.000. Si llenases una estrella de neutrones con esferas del tamaño del Sol, cabrían 200. Las escalas del universo no tienen analogía terrestre."},
  // ── QUÍMICA ──────────────────────────────────────────────────
  {e:"💧",t:"El agua es la única sustancia común que existe naturalmente en los tres estados en la superficie terrestre: sólida (hielo), líquida (agua) y gaseosa (vapor). Esta rareza hizo posible la vida como la conocemos."},
  {e:"🧪",t:"El flúor es el elemento más reactivo de la tabla periódica: ataca casi todo, incluido el vidrio y el agua. Los laboratorios lo almacenan en contenedores de níquel o plomo — prácticamente los únicos materiales que resiste."},
  {e:"💡",t:"La tabla periódica de Mendeleev (1869) tenía 'huecos' para elementos que aún no existían. Cuando el galio (1875) y el germanio (1886) fueron descubiertos, sus propiedades coincidieron exactamente con las predicciones. Ciencia predictiva pura."},
  {e:"⚗️",t:"El grafeno, descubierto en 2004 (Nobel 2010), es 200 veces más resistente que el acero, casi transparente, conduce electricidad mejor que el cobre y tiene un solo átomo de grosor. El material del futuro."},
  {e:"🌡️",t:"El mercurio es el único metal líquido a temperatura ambiente normal. El galio se derrite en la mano (29.7°C). El cesio explota al contacto con el agua. Tres metales que desafían la idea de lo que es 'un metal'."},
  {e:"💣",t:"Alfred Nobel inventó la dinamita en 1867 mezclando nitroglicerina con tierra de diatomeas — haciéndola segura de transportar. El remordimiento por su uso bélico lo llevó a fundar los Premios Nobel en su testamento."},
  {e:"🔵",t:"El nitrógeno líquido (-196°C) hierve instantáneamente al contactar el aire ambiente. Es más frío que la superficie de Plutón (-218°C en promedio). Se usa en criónica, cirugía dermatológica y como enfriador de procesadores."},
  {e:"🌿",t:"El oxígeno fue 'descubierto' simultáneamente por Carl Scheele (Suecia, 1773) y Joseph Priestley (Inglaterra, 1774). Ninguno de los dos entendió del todo lo que había encontrado — fue Lavoisier quien lo nombró y explicó."},
  {e:"🧲",t:"El superconductor más eficiente del mundo (mercurio a -269°C) conduce electricidad sin resistencia. Si lográsemos superconductividad a temperatura ambiente, la distribución de energía sería prácticamente sin pérdidas."},
  {e:"⚡",t:"Una mole (6 × 10²³) de palomitas de maíz llenaría el universo observable. Un mol de átomos de hierro cabe en la palma de tu mano. La diferencia entre lo macro y lo micro es lo que hace fascinante a la química."},
  // ── ASTRONOMÍA ──────────────────────────────────────────────
  {e:"🌌",t:"La Vía Láctea tiene entre 100.000 y 400.000 millones de estrellas. El universo observable tiene al menos 2 billones de galaxias. La cifra de estrellas totales supera a todos los granos de arena de la Tierra."},
  {e:"♇",t:"Plutón fue planeta de 1930 a 2006, cuando fue reclasificado como 'planeta enano'. Tiene 5 lunas, la mayor (Caronte) es casi la mitad de su tamaño. Técnicamente Plutón-Caronte es un sistema binario."},
  {e:"🪐",t:"La Gran Mancha Roja de Júpiter es una tormenta que lleva al menos 350 años activa y es más grande que la Tierra. Pero se está encogiendo: en el siglo XIX medía el doble. En algún momento desaparecerá."},
  {e:"⏰",t:"Un día en Venus (243 días terrestres) es más largo que un año en Venus (225 días terrestres). Además, Venus rota en sentido contrario a la Tierra — el Sol allí sale por el oeste y se pone por el este."},
  {e:"💫",t:"Las estrellas de neutrones pueden rotar hasta 716 veces por segundo (el pulsar J1748-2446). En cada rotación emiten un destello de radio. Los astrónomos las descubrieron y pensaron que era comunicación alienígena."},
  {e:"🌍",t:"La luz que ves del Sol tiene 8 minutos de antigüedad. La de la estrella más cercana (Próxima Centauri), 4.2 años. La de la galaxia Andrómeda, 2.5 millones de años. Observar el cosmos es observar el pasado."},
  {e:"💧",t:"Hay agua en la Luna, en Marte, en las lunas de Júpiter (Europa) y Saturno (Encélado), y en cometas. El universo está lleno de agua — la condición más básica para la vida como la conocemos es casi universal."},
  {e:"🌟",t:"Betelgeuse (hombro de Orión) es una supergigante roja tan grande que si estuviera en el lugar del Sol, su superficie llegaría hasta la órbita de Júpiter. Podría explotar como supernova en cualquier momento (en términos astronómicos: en los próximos 100.000 años)."},
  {e:"🌑",t:"El universo observable tiene 93.000 millones de años luz de diámetro, aunque solo tiene 13.800 millones de años. Pudo crecer tanto porque en los primeros instantes la expansión fue más rápida que la luz — la 'inflación cósmica'."},
  {e:"🪐",t:"Saturno tiene una densidad menor que el agua — si existiera un océano suficientemente grande, Saturno flotaría en él. Es el único planeta del sistema solar con esa característica."},
  {e:"🔭",t:"La 'Hubble Deep Field' (1995) apuntó el telescopio Hubble a un trozo de cielo aparentemente vacío durante 10 días. Encontró más de 3.000 galaxias en ese diminuto cuadrado. El universo nunca está vacío."},
  // ── BIOLOGÍA ─────────────────────────────────────────────────
  {e:"🧬",t:"El ADN de dos humanos es 99.9% idéntico. Ese 0.1% de diferencia genera toda la diversidad visible: color de ojos, piel, altura, predisposiciones. Somos extraordinariamente similares y fascinantemente distintos."},
  {e:"🍌",t:"El 60% del ADN humano es compartido con el plátano (banana). Compartimos el 85% con un ratón y el 98.7% con los chimpancés. La evolución reutiliza soluciones que funcionaron mil millones de años antes."},
  {e:"🪼",t:"La medusa Turritopsis dohrnii es biológicamente inmortal: cuando envejece, vuelve a su estado juvenil (pólipo) y reinicia su ciclo de vida. Es el único animal conocido capaz de revertir completamente su envejecimiento."},
  {e:"🐦",t:"Los cuervos pueden reconocer rostros humanos, sostener rencores y transmitir ese conocimiento a otras generaciones. Experimentos en la Universidad de Washington demostraron que los cuervos enseñan a sus crías a odiar a personas específicas."},
  {e:"🌲",t:"Los árboles se comunican entre sí a través de redes de hongos micorrícicos subterráneos ('la Wood Wide Web'). Comparten nutrientes, envían señales de alerta contra insectos y priorizan a sus 'parientes' cercanos."},
  {e:"🦠",t:"Una bacteria puede reproducirse cada 20 minutos. En teoría, una sola bacteria podría generar más masa que la Tierra en 2 días — si tuviera nutrientes infinitos. La exponencialidad es el motor de la vida."},
  {e:"🦈",t:"Los tiburones tienen un órgano sin equivalente en humanos: la 'ampolla de Lorenzini', que detecta campos electromagnéticos. Pueden encontrar una presa enterrada bajo la arena a metros de distancia detectando su latido cardíaco."},
  {e:"🌱",t:"Las plantas 'gritan' cuando están bajo estrés: emiten ultrasonidos que otros organismos pueden detectar. Se registraron más de 30 decibelios de señales ultrasónicas en plantas deshidratadas o cortadas."},
  {e:"🐜",t:"Una colonia de hormigas leafcutter puede transportar hasta 50 toneladas de hojas por año. Usan esas hojas para cultivar hongos específicos — son agricultoras desde hace 60 millones de años, mucho antes que los humanos."},
  {e:"🫁",t:"El cuerpo humano produce 25 millones de células nuevas por segundo. En el tiempo que tardas en leer esto (~10 segundos), creaste 250 millones de células. El cuerpo se renueva casi completamente cada 7-10 años."},
  {e:"🌳",t:"El árbol más pesado del mundo es 'General Sherman', una secuoya gigante de 1.385 toneladas, 84 metros de altura y 2.100 años de edad. Sigue creciendo: añade la madera equivalente a un árbol mediano cada año."},
  // ── ECOLOGÍA ─────────────────────────────────────────────────
  {e:"🌿",t:"El Amazonas produce el 20% del oxígeno terrestre y alberga el 10% de todas las especies del planeta. Sus árboles 'transpiran' tanta agua que crean sus propias lluvias ('ríos voladores') que riegan Brasil y Argentina."},
  {e:"🪸",t:"Los arrecifes de coral cubren menos del 1% del océano pero albergan el 25% de todas las especies marinas. En 2023, el 54% de los arrecifes del mundo estaba sufriendo un episodio de blanqueamiento — el mayor registrado."},
  {e:"🐳",t:"Las ballenas jorobadas tienen canciones que evolucionan culturalmente: una nueva variación vocal se extiende por el océano de oeste a este en pocos años. Los machos aprenden de sus vecinos y modifican sus canciones. Es cultura animal."},
  {e:"🧊",t:"El permafrost siberiano almacena el doble de carbono que hay actualmente en la atmósfera terrestre. Si se derrite, liberaría metano (30 veces más potente que el CO₂ como gas de efecto invernadero) en un proceso autosuficiente."},
  {e:"🦟",t:"El mosquito es el animal más letal para los humanos: causa ~1 millón de muertes anuales por malaria, dengue y otras enfermedades. El segundo lugar es el ser humano (~400.000 muertes por violencia). Los tiburones matan ~10/año."},
  {e:"🌊",t:"El océano absorbe el 90% del calor extra generado por el cambio climático y el 25% del CO₂ humano. Sin los océanos, la temperatura terrestre habría subido 10°C más desde la revolución industrial."},
  {e:"🐋",t:"La extinción del mamut lanudo (~10.000 a.C.) coincide con la llegada del ser humano moderno a América del Norte. Los científicos debaten si fue la caza humana, el cambio climático, o ambos. El jurado sigue deliberando."},
  // ── ECONOMÍA ─────────────────────────────────────────────────
  {e:"📊",t:"El 'índice Big Mac' del The Economist (publicado desde 1986) mide la paridad del poder adquisitivo comparando el precio de una hamburguesa en distintos países. Los economistas lo citan en papers académicos serios."},
  {e:"💰",t:"Los 8 hombres más ricos del mundo poseen más riqueza que la mitad más pobre de la humanidad (4.000 millones de personas). Esta estadística, publicada por Oxfam en 2017, sigue siendo válida ajustada a 2024."},
  {e:"⛽",t:"El Bitcoin consume más energía eléctrica anualmente que Argentina. Una sola transacción de Bitcoin requiere la misma energía que el uso doméstico de una casa durante 50 días. El costo ambiental del dinero digital es real."},
  {e:"🏦",t:"El 'efecto Cantillon' (1730) describe cómo la emisión de dinero nuevo beneficia desproporcionadamente a los primeros en recibirlo (bancos, gobierno) y perjudica a los últimos (salarios, ahorristas). 300 años después, sigue siendo polémico."},
  {e:"🌐",t:"La economía informal global representa aproximadamente el 32% del PIB mundial. En Colombia, India y varios países africanos supera el 50%. Millones de personas trabajan fuera de cualquier sistema de registro tributario."},
  {e:"📈",t:"El 'efecto riqueza' en economía: cuando sube el precio de las acciones o las casas, las personas gastan más aunque sus ingresos no hayan cambiado. Estiman que cada 1$ de aumento en riqueza en papel genera 3-5 centavos de consumo extra."},
  {e:"🤝",t:"La paradoja de Condorcet (1785) demuestra matemáticamente que las preferencias colectivas pueden ser inconsistentes aunque las individuales sean perfectamente racionales. La democracia tiene un bug matemático incorporado."},
  {e:"🔄",t:"El 'Efecto Cobra' describe cómo las políticas bien intencionadas generan el efecto contrario: en la India colonial, el gobierno pagó por cobras muertas para reducirlas. La gente empezó a criar cobras para cobrar la recompensa. La población creció."},
];

// ═══════════════════════════════════════════════════════════════
// EXPORTACIÓN PRINCIPAL
// ═══════════════════════════════════════════════════════════════
const FACT_CATS = [
  {id:"mundial",  label:"🌍 Mundial",  facts:FACTS_MUNDIAL},
  {id:"colombia", label:"🇨🇴 Colombia", facts:FACTS_COLOMBIA},
  {id:"paises",   label:"⚽ Países",   facts:FACTS_PAISES},
  {id:"cultura",  label:"🧠 Cultura",  facts:FACTS_CULTURA},
  {id:"ciencia",  label:"🔬 Ciencia",  facts:FACTS_CIENCIA},
];

// ═══ GRUPOS Y CONSTANTES ══════════════════════════════════════════════
const GROUPS = {
  A:[{n:"México",f:"🇲🇽"},{n:"Sudáfrica",f:"🇿🇦"},{n:"Corea del Sur",f:"🇰🇷"},{n:"Chequia",f:"🇨🇿"}],
  B:[{n:"Canadá",f:"🇨🇦"},{n:"Bosnia-Herz.",f:"🇧🇦"},{n:"Catar",f:"🇶🇦"},{n:"Suiza",f:"🇨🇭"}],
  C:[{n:"Brasil",f:"🇧🇷"},{n:"Marruecos",f:"🇲🇦"},{n:"Haití",f:"🇭🇹"},{n:"Escocia",f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿"}],
  D:[{n:"EE.UU.",f:"🇺🇸"},{n:"Paraguay",f:"🇵🇾"},{n:"Australia",f:"🇦🇺"},{n:"Türkiye",f:"🇹🇷"}],
  E:[{n:"Alemania",f:"🇩🇪"},{n:"Curazao",f:"🇨🇼"},{n:"C. de Marfil",f:"🇨🇮"},{n:"Ecuador",f:"🇪🇨"}],
  F:[{n:"P. Bajos",f:"🇳🇱"},{n:"Japón",f:"🇯🇵"},{n:"Suecia",f:"🇸🇪"},{n:"Túnez",f:"🇹🇳"}],
  G:[{n:"Bélgica",f:"🇧🇪"},{n:"Egipto",f:"🇪🇬"},{n:"Irán",f:"🇮🇷"},{n:"N. Zelanda",f:"🇳🇿"}],
  H:[{n:"España",f:"🇪🇸"},{n:"A. Saudita",f:"🇸🇦"},{n:"Uruguay",f:"🇺🇾"},{n:"Cabo Verde",f:"🇨🇻"}],
  I:[{n:"Francia",f:"🇫🇷"},{n:"Senegal",f:"🇸🇳"},{n:"Iraq",f:"🇮🇶"},{n:"Noruega",f:"🇳🇴"}],
  J:[{n:"Argentina",f:"🇦🇷"},{n:"Argelia",f:"🇩🇿"},{n:"Austria",f:"🇦🇹"},{n:"Jordania",f:"🇯🇴"}],
  K:[{n:"Portugal",f:"🇵🇹"},{n:"DR Congo",f:"🇨🇩"},{n:"Uzbekistán",f:"🇺🇿"},{n:"Colombia",f:"🇨🇴"}],
  L:[{n:"Inglaterra",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿"},{n:"Croacia",f:"🇭🇷"},{n:"Ghana",f:"🇬🇭"},{n:"Panamá",f:"🇵🇦"}],
};
const GKS=["A","B","C","D","E","F","G","H","I","J","K","L"];
const ALL_TEAMS=[...new Set(Object.values(GROUPS).flat().map(t=>t.n))].sort();
const KO_ROUNDS=[
  {id:"r32",label:"Dieciseisavos de Final",short:"R32",emoji:"⚔️"},
  {id:"r16",label:"Octavos de Final",short:"Octavos",emoji:"🏟️"},
  {id:"qf",label:"Cuartos de Final",short:"Cuartos",emoji:"⚡"},
  {id:"sf",label:"Semifinales",short:"Semis",emoji:"🔥"},
  {id:"tp",label:"Tercer Puesto",short:"3° Lugar",emoji:"🥉"},
  {id:"final",label:"La Gran Final",short:"FINAL",emoji:"🏆"},
];
const PLAYERS=[
  "Erling Haaland 🇳🇴","Kylian Mbappé 🇫🇷","Harry Kane 🏴󠁧󠁢󠁥󠁮󠁧󠁿","Vinicius Jr. 🇧🇷",
  "Jude Bellingham 🏴󠁧󠁢󠁥󠁮󠁧󠁿","Lamine Yamal 🇪🇸","Pedri 🇪🇸","Florian Wirtz 🇩🇪",
  "Jamal Musiala 🇩🇪","Julian Álvarez 🇦🇷","Lionel Messi 🇦🇷","Rodrygo 🇧🇷",
  "Darwin Núñez 🇺🇾","Mohamed Salah 🇪🇬","Achraf Hakimi 🇲🇦","Antoine Griezmann 🇫🇷",
  "Ousmane Dembélé 🇫🇷","Phil Foden 🏴󠁧󠁢󠁥󠁮󠁧󠁿","Bukayo Saka 🏴󠁧󠁢󠁥󠁮󠁧󠁿","Christian Pulisic 🇺🇸",
  "Son Heung-min 🇰🇷","Cody Gakpo 🇳🇱","Memphis Depay 🇳🇱","Thomas Müller 🇩🇪",
  "Luis Díaz 🇨🇴","James Rodríguez 🇨🇴","Jhon Durán 🇨🇴","Álvaro Morata 🇪🇸",
  "Bruno Fernandes 🇵🇹","Rafael Leão 🇵🇹","Kevin De Bruyne 🇧🇪","Lautaro Martínez 🇦🇷",
  "Dani Olmo 🇪🇸","Victor Osimhen 🇳🇬","Hakim Ziyech 🇲🇦","Rodrigo De Paul 🇦🇷",
  "Richarlison 🇧🇷","Romelu Lukaku 🇧🇪","Gavi 🇪🇸","Ferran Torres 🇪🇸",
  "Takumi Minamino 🇯🇵","Alphonso Davies 🇨🇦","Edin Džeko 🇧🇦",
];


// ═══ CALENDARIO FASE DE GRUPOS — Fuente: FIFA/NBC Sports — Horas Colombia (UTC-5) ════
// ═══ CALENDARIO FASE DE GRUPOS — Fuente: FIFA/NBC Sports — Horas Colombia (UTC-5) ════
const SCHEDULE = {
  // Grupo A
  "A|MéxicovSudáfrica": {d:"Jun 11",h:"14:00",st:"Estadio Azteca, México"},
  "A|Corea del SurvChequia": {d:"Jun 11",h:"21:00",st:"Estadio Akron, Guadalajara"},
  "A|SudáfricavChequia": {d:"Jun 18",h:"11:00",st:"Mercedes-Benz, Atlanta"},
  "A|MéxicovCorea del Sur": {d:"Jun 18",h:"20:00",st:"Estadio Akron, Guadalajara"},
  "A|MéxicovChequia": {d:"Jun 24",h:"20:00",st:"Estadio Azteca, México"},
  "A|SudáfricavCorea del Sur": {d:"Jun 24",h:"20:00",st:"Estadio BBVA, Monterrey"},

  // Grupo B
  "B|CanadávBosnia-Herz.": {d:"Jun 12",h:"14:00",st:"BMO Field, Toronto"},
  "B|CatarvSuiza": {d:"Jun 13",h:"14:00",st:"Levi's Stadium, San José"},
  "B|Bosnia-Herz.vSuiza": {d:"Jun 18",h:"14:00",st:"SoFi Stadium, Los Ángeles"},
  "B|CanadávCatar": {d:"Jun 18",h:"17:00",st:"BC Place, Vancouver"},
  "B|CanadávSuiza": {d:"Jun 24",h:"14:00",st:"BC Place, Vancouver"},
  "B|Bosnia-Herz.vCatar": {d:"Jun 24",h:"14:00",st:"Lumen Field, Seattle"},

  // Grupo C
  "C|BrasilvMarruecos": {d:"Jun 13",h:"17:00",st:"MetLife Stadium, NY/NJ"},
  "C|HaitívEscocia": {d:"Jun 13",h:"20:00",st:"Gillette Stadium, Boston"},
  "C|MarruecosvEscocia": {d:"Jun 19",h:"17:00",st:"Gillette Stadium, Boston"},
  "C|BrasilvHaití": {d:"Jun 19",h:"19:30",st:"Lincoln Financial, Filadelfia"},
  "C|BrasilvEscocia": {d:"Jun 24",h:"17:00",st:"Hard Rock Stadium, Miami"},
  "C|MarruecosvHaití": {d:"Jun 24",h:"17:00",st:"Mercedes-Benz, Atlanta"},

  // Grupo D
  "D|EE.UU.vParaguay": {d:"Jun 12",h:"20:00",st:"SoFi Stadium, Los Ángeles"},
  "D|AustraliavTürkiye": {d:"Jun 13",h:"23:00",st:"BC Place, Vancouver"},
  "D|EE.UU.vAustralia": {d:"Jun 19",h:"14:00",st:"Lumen Field, Seattle"},
  "D|ParaguayvTürkiye": {d:"Jun 19",h:"22:00",st:"Levi's Stadium, San José"},
  "D|EE.UU.vTürkiye": {d:"Jun 25",h:"21:00",st:"SoFi Stadium, Los Ángeles"},
  "D|ParaguayvAustralia": {d:"Jun 25",h:"21:00",st:"Levi's Stadium, San José"},

  // Grupo E
  "E|AlemaniavCurazao": {d:"Jun 14",h:"12:00",st:"NRG Stadium, Houston"},
  "E|C. de MarfilvEcuador": {d:"Jun 14",h:"18:00",st:"Lincoln Financial, Filadelfia"},
  "E|AlemaniavC. de Marfil": {d:"Jun 20",h:"15:00",st:"BMO Field, Toronto"},
  "E|CurazaovEcuador": {d:"Jun 20",h:"19:00",st:"Arrowhead, Kansas City"},
  "E|CurazaovC. de Marfil": {d:"Jun 25",h:"15:00",st:"Lincoln Financial, Filadelfia"},
  "E|AlemaniavEcuador": {d:"Jun 25",h:"15:00",st:"MetLife Stadium, NY/NJ"},

  // Grupo F
  "F|P. BajosvJapón": {d:"Jun 14",h:"15:00",st:"AT&T Stadium, Dallas"},
  "F|SueciavTúnez": {d:"Jun 14",h:"21:00",st:"Estadio BBVA, Monterrey"},
  "F|P. BajosvSuecia": {d:"Jun 20",h:"12:00",st:"NRG Stadium, Houston"},
  "F|JapónvTúnez": {d:"Jun 20",h:"23:00",st:"Estadio BBVA, Monterrey"},
  "F|JapónvSuecia": {d:"Jun 25",h:"18:00",st:"AT&T Stadium, Dallas"},
  "F|P. BajosvTúnez": {d:"Jun 25",h:"18:00",st:"Arrowhead, Kansas City"},

  // Grupo G
  "G|BélgicavEgipto": {d:"Jun 15",h:"14:00",st:"Lumen Field, Seattle"},
  "G|IránvN. Zelanda": {d:"Jun 15",h:"20:00",st:"SoFi Stadium, Los Ángeles"},
  "G|BélgicavIrán": {d:"Jun 21",h:"14:00",st:"SoFi Stadium, Los Ángeles"},
  "G|EgiptovN. Zelanda": {d:"Jun 21",h:"20:00",st:"BC Place, Vancouver"},
  "G|EgiptovIrán": {d:"Jun 26",h:"22:00",st:"Lumen Field, Seattle"},
  "G|BélgicavN. Zelanda": {d:"Jun 26",h:"22:00",st:"BC Place, Vancouver"},

  // Grupo H
  "H|EspañavCabo Verde": {d:"Jun 15",h:"11:00",st:"Mercedes-Benz, Atlanta"},
  "H|A. SauditavUruguay": {d:"Jun 15",h:"17:00",st:"Hard Rock Stadium, Miami"},
  "H|EspañavA. Saudita": {d:"Jun 21",h:"11:00",st:"Mercedes-Benz, Atlanta"},
  "H|UruguayvCabo Verde": {d:"Jun 21",h:"17:00",st:"Hard Rock Stadium, Miami"},
  "H|A. SauditavCabo Verde": {d:"Jun 26",h:"19:00",st:"NRG Stadium, Houston"},
  "H|EspañavUruguay": {d:"Jun 26",h:"19:00",st:"Estadio Akron, Guadalajara"},

  // Grupo I
  "I|FranciavSenegal": {d:"Jun 16",h:"14:00",st:"MetLife Stadium, NY/NJ"},
  "I|IraqvNoruega": {d:"Jun 16",h:"17:00",st:"Gillette Stadium, Boston"},
  "I|FranciavIraq": {d:"Jun 22",h:"16:00",st:"Lincoln Financial, Filadelfia"},
  "I|SenegalvNoruega": {d:"Jun 22",h:"19:00",st:"MetLife Stadium, NY/NJ"},
  "I|FranciavNoruega": {d:"Jun 26",h:"14:00",st:"Gillette Stadium, Boston"},
  "I|SenegalvIraq": {d:"Jun 26",h:"14:00",st:"BMO Field, Toronto"},

  // Grupo J
  "J|ArgentinavArgelia": {d:"Jun 16",h:"20:00",st:"Arrowhead, Kansas City"},
  "J|AustriavJordania": {d:"Jun 16",h:"23:00",st:"Levi's Stadium, San José"},
  "J|ArgentinavAustria": {d:"Jun 22",h:"12:00",st:"AT&T Stadium, Dallas"},
  "J|ArgeliavJordania": {d:"Jun 22",h:"22:00",st:"Levi's Stadium, San José"},
  "J|ArgeliavAustria": {d:"Jun 27",h:"21:00",st:"Arrowhead, Kansas City"},
  "J|ArgentinavJordania": {d:"Jun 27",h:"21:00",st:"AT&T Stadium, Arlington"},

  // Grupo K
  "K|PortugalvDR Congo": {d:"Jun 17",h:"12:00",st:"NRG Stadium, Houston"},
  "K|UzbekistánvColombia": {d:"Jun 17",h:"21:00",st:"Estadio Azteca, México"},
  "K|PortugalvUzbekistán": {d:"Jun 23",h:"12:00",st:"NRG Stadium, Houston"},
  "K|DR CongovColombia": {d:"Jun 23",h:"21:00",st:"Estadio Akron, Guadalajara"},
  "K|PortugalvColombia": {d:"Jun 27",h:"18:30",st:"Hard Rock Stadium, Miami"},
  "K|DR CongovUzbekistán": {d:"Jun 27",h:"18:30",st:"Mercedes-Benz, Atlanta"},

  // Grupo L
  "L|InglaterravCroacia": {d:"Jun 17",h:"15:00",st:"AT&T Stadium, Dallas"},
  "L|GhanavPanamá": {d:"Jun 17",h:"18:00",st:"BMO Field, Toronto"},
  "L|InglaterravGhana": {d:"Jun 23",h:"15:00",st:"Gillette Stadium, Boston"},
  "L|CroaciavPanamá": {d:"Jun 23",h:"18:00",st:"BMO Field, Toronto"},
  "L|InglaterravPanamá": {d:"Jun 27",h:"16:00",st:"MetLife Stadium, NY/NJ"},
  "L|CroaciavGhana": {d:"Jun 27",h:"16:00",st:"Lincoln Financial, Filadelfia"},

};

const GROUP_ORDER = {
  A:["A|MéxicovSudáfrica","A|Corea del SurvChequia","A|SudáfricavChequia","A|MéxicovCorea del Sur","A|MéxicovChequia","A|SudáfricavCorea del Sur"],
  B:["B|CanadávBosnia-Herz.","B|CatarvSuiza","B|Bosnia-Herz.vSuiza","B|CanadávCatar","B|CanadávSuiza","B|Bosnia-Herz.vCatar"],
  C:["C|BrasilvMarruecos","C|HaitívEscocia","C|MarruecosvEscocia","C|BrasilvHaití","C|BrasilvEscocia","C|MarruecosvHaití"],
  D:["D|EE.UU.vParaguay","D|AustraliavTürkiye","D|EE.UU.vAustralia","D|ParaguayvTürkiye","D|EE.UU.vTürkiye","D|ParaguayvAustralia"],
  E:["E|AlemaniavCurazao","E|C. de MarfilvEcuador","E|AlemaniavC. de Marfil","E|CurazaovEcuador","E|CurazaovC. de Marfil","E|AlemaniavEcuador"],
  F:["F|P. BajosvJapón","F|SueciavTúnez","F|P. BajosvSuecia","F|JapónvTúnez","F|JapónvSuecia","F|P. BajosvTúnez"],
  G:["G|BélgicavEgipto","G|IránvN. Zelanda","G|BélgicavIrán","G|EgiptovN. Zelanda","G|EgiptovIrán","G|BélgicavN. Zelanda"],
  H:["H|EspañavCabo Verde","H|A. SauditavUruguay","H|EspañavA. Saudita","H|UruguayvCabo Verde","H|A. SauditavCabo Verde","H|EspañavUruguay"],
  I:["I|FranciavSenegal","I|IraqvNoruega","I|FranciavIraq","I|SenegalvNoruega","I|FranciavNoruega","I|SenegalvIraq"],
  J:["J|ArgentinavArgelia","J|AustriavJordania","J|ArgentinavAustria","J|ArgeliavJordania","J|ArgeliavAustria","J|ArgentinavJordania"],
  K:["K|PortugalvDR Congo","K|UzbekistánvColombia","K|PortugalvUzbekistán","K|DR CongovColombia","K|PortugalvColombia","K|DR CongovUzbekistán"],
  L:["L|InglaterravCroacia","L|GhanavPanamá","L|InglaterravGhana","L|CroaciavPanamá","L|InglaterravPanamá","L|CroaciavGhana"],
};

function mkM(gk){
  const t=GROUPS[gk];
  const rawMap={};
  for(let i=0;i<t.length;i++)for(let j=i+1;j<t.length;j++){
    const id=`${gk}|${t[i].n}v${t[j].n}`;
    rawMap[id]={h:t[i],a:t[j],id};
  }
  const order=GROUP_ORDER[gk];
  if(!order) return Object.values(rawMap);
  const ordered=order.map(sid=>rawMap[sid]).filter(Boolean);
  // Fallback: if ordering incomplete, return all raw matches
  return ordered.length===6?ordered:Object.values(rawMap);
}
function gW(h,a){const hi=parseInt(h),ai=parseInt(a);if(isNaN(hi)||isNaN(ai)||h===""||a==="")return null;return hi>ai?"H":ai>hi?"A":"D";}
function sMatch(ph,pa,rh,ra){const pw=gW(ph,pa),rw=gW(rh,ra);if(!pw||!rw||pw!==rw)return 0;return+ph===+rh&&+pa===+ra?5:3;}
function sKO(pred,result){
  if(!pred||!result||pred.h===""||pred.a===""||result.h===""||result.a==="")return 0;
  const ph=+pred.h,pa=+pred.a,rh=+result.h,ra=+result.a;
  if(isNaN(ph)||isNaN(pa)||isNaN(rh)||isNaN(ra))return 0;
  const pW=ph>pa?"H":pa>ph?"A":pred.penWinner,rW=rh>ra?"H":ra>rh?"A":result.penWinner;
  if(!pW||!rW)return 0;
  let pts=0;
  if(ph===rh&&pa===ra){pts+=8;if(rh===ra&&pred.penWinner&&result.penWinner&&pred.penWinner===result.penWinner)pts+=3;}
  else if(pW===rW){pts+=4;if(rh===ra&&ph===pa&&pred.penWinner&&result.penWinner&&pred.penWinner===result.penWinner)pts+=3;}
  return pts;
}
function tPts(gk,mp){const p={};GROUPS[gk].forEach(t=>p[t.n]=0);mkM(gk).forEach(({h,a,id})=>{const m=mp?.[id];if(!m||m.h===""||m.a==="")return;const hi=+m.h,ai=+m.a;if(hi>ai)p[h.n]+=3;else if(ai>hi)p[a.n]+=3;else{p[h.n]++;p[a.n]++;}});return p;}
function cStand(gk,matches){
  const s={};
  GROUPS[gk].forEach(t=>{s[t.n]={n:t.n,f:t.f,c:t.c||"",pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,pts:0};});
  const mList=mkM(gk);
  mList.forEach(({h,a,id})=>{
    const m=matches?.[id];if(!m||m.h===""||m.a==="")return;
    const hi=+m.h,ai=+m.a;
    s[h.n].pj++;s[a.n].pj++;s[h.n].gf+=hi;s[h.n].gc+=ai;s[a.n].gf+=ai;s[a.n].gc+=hi;
    if(hi>ai){s[h.n].pg++;s[h.n].pts+=3;s[a.n].pp++;}
    else if(ai>hi){s[a.n].pg++;s[a.n].pts+=3;s[h.n].pp++;}
    else{s[h.n].pe++;s[h.n].pts++;s[a.n].pe++;s[a.n].pts++;}
  });
  const tvs=Object.values(s);
  function h2h(sub){
    const hh={};sub.forEach(t=>{hh[t.n]={pts:0,gd:0,gf:0};});
    mList.forEach(({h,a,id})=>{
      if(!sub.some(t=>t.n===h.n)||!sub.some(t=>t.n===a.n))return;
      const m=matches?.[id];if(!m||m.h===""||m.a==="")return;
      const hi=+m.h,ai=+m.a;
      hh[h.n].gd+=hi-ai;hh[h.n].gf+=hi;hh[a.n].gd+=ai-hi;hh[a.n].gf+=ai;
      if(hi>ai)hh[h.n].pts+=3;else if(ai>hi)hh[a.n].pts+=3;else{hh[h.n].pts++;hh[a.n].pts++;}
    });
    return hh;
  }
  // Orden FIFA 2026: 1.Pts generales → 2.H2H pts → 3.H2H DG → 4.H2H GF → 5.DG general → 6.GF general → 7.Sorteo
  function cmp(a,b){
    if(b.pts!==a.pts)return b.pts-a.pts;
    const tied=tvs.filter(t=>t.pts===a.pts);
    if(tied.length>=2&&tied.length<=3){
      const hh=h2h(tied);
      const ha=hh[a.n],hb=hh[b.n];
      if(hb.pts!==ha.pts)return hb.pts-ha.pts;
      if(hb.gd!==ha.gd)return hb.gd-ha.gd;
      if(hb.gf!==ha.gf)return hb.gf-ha.gf;
    }
    const agd=a.gf-a.gc,bgd=b.gf-b.gc;
    if(bgd!==agd)return bgd-agd;
    if(b.gf!==a.gf)return b.gf-a.gf;
    return 0;
  }
  return tvs.sort(cmp);
}

function calcScore(preds,results,koTeams,koResults,koUnlocked,spRes){
  let group=0,knockout=0,special=0;
  GKS.forEach(gk=>{
    let aEx=true,aSt=true;
    mkM(gk).forEach(({id})=>{const p=preds?.matches?.[id],r=results?.matches?.[id];if(!p||!r||p.h===""||p.a===""||r.h===""||r.a===""){aEx=false;return;}const pts=sMatch(p.h,p.a,r.h,r.a);if(+p.h!==+r.h||+p.a!==+r.a)aEx=false;group+=pts;});
    const rs=results?.standings?.[gk],ps=preds?.standings?.[gk];
    if(rs&&ps){for(let i=0;i<4;i++){if(ps[i]&&rs[i]&&ps[i]===rs[i])group+=2;else aSt=false;}const ptp=tPts(gk,preds?.matches),rtp=tPts(gk,results?.matches);GROUPS[gk].forEach(t=>{if(ptp[t.n]===rtp[t.n])group+=1;});if(aEx&&aSt)group+=10;}else aSt=false;
  });
  KO_ROUNDS.forEach(({id:rid})=>{
    if(!koUnlocked?.[rid])return;
    const defs=KO_DEFS.filter(d=>d.round===rid);let rOk=0,rTot=0;
    defs.forEach(({id:mid})=>{const teams=koTeams?.[mid],result=koResults?.[mid],pred=preds?.ko?.[mid];if(!teams?.h||!teams?.a||!result||result.h===""||!pred)return;rTot++;const pts=sKO(pred,result);knockout+=pts;const pW=+pred.h>+pred.a?"H":+pred.a>+pred.h?"A":pred.penWinner,rW=+result.h>+result.a?"H":+result.a>+result.h?"A":result.penWinner;if(pW&&rW&&pW===rW)rOk++;});
    if(rTot>0&&rOk===rTot&&rOk===defs.length)knockout+=5;
  });
  if(spRes?.topScorer&&preds?.special?.topScorer===spRes.topScorer)special+=15;
  if(spRes?.goldenBall&&preds?.special?.goldenBall===spRes.goldenBall)special+=10;
  return{total:group+knockout+special,group,knockout,special};
}
const _sb=createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
const ST={
  get:async k=>{try{const{data,error}=await _sb.from('prode_kv').select('value').eq('key',k).maybeSingle();if(error)throw error;return data?.value??null;}catch(e){console.error('ST.get',e);return null;}},
  set:async(k,v)=>{try{const{error}=await _sb.from('prode_kv').upsert({key:k,value:v,updated_at:new Date().toISOString()},{onConflict:'key'});if(error)throw error;}catch(e){console.error('ST.set',e);}}
};

// ═══ CIUDADES PARA AUTOCOMPLETAR ══════════════════════════════════════
const CITIES = [
  "Bogotá, Colombia","Medellín, Colombia","Cali, Colombia","Barranquilla, Colombia",
  "Cartagena, Colombia","Bucaramanga, Colombia","Pereira, Colombia","Manizales, Colombia",
  "Santa Marta, Colombia","Villavicencio, Colombia","Ibagué, Colombia","Pasto, Colombia",
  "Cúcuta, Colombia","Montería, Colombia","Armenia, Colombia","Popayán, Colombia",
  "Valledupar, Colombia","Neiva, Colombia","Sincelejo, Colombia","Tunja, Colombia",
  // América del Sur
  "Buenos Aires, Argentina","Córdoba, Argentina","Rosario, Argentina","Mendoza, Argentina",
  "São Paulo, Brasil","Río de Janeiro, Brasil","Brasilia, Brasil","Salvador, Brasil","Fortaleza, Brasil",
  "Lima, Perú","Santiago, Chile","Montevideo, Uruguay","Asunción, Paraguay",
  "La Paz, Bolivia","Quito, Ecuador","Guayaquil, Ecuador","Caracas, Venezuela",
  "Maracaibo, Venezuela","Ciudad de Panamá, Panamá",
  // América Central y Caribe
  "Ciudad de México, México","Guadalajara, México","Monterrey, México","Puebla, México",
  "San José, Costa Rica","Ciudad de Guatemala, Guatemala","Tegucigalpa, Honduras",
  "Managua, Nicaragua","San Salvador, El Salvador","Santo Domingo, Rep. Dominicana",
  "La Habana, Cuba","San Juan, Puerto Rico","Kingston, Jamaica","Puerto Príncipe, Haití",
  // América del Norte
  "New York, Estados Unidos","Los Ángeles, Estados Unidos","Chicago, Estados Unidos",
  "Miami, Estados Unidos","Houston, Estados Unidos","Dallas, Estados Unidos",
  "San Francisco, Estados Unidos","Washington D.C., Estados Unidos","Boston, Estados Unidos",
  "Seattle, Estados Unidos","Atlanta, Estados Unidos","Toronto, Canadá","Vancouver, Canadá",
  "Montreal, Canadá","Ottawa, Canadá",
  // Europa
  "Madrid, España","Barcelona, España","Valencia, España","Sevilla, España","Bilbao, España",
  "Lisboa, Portugal","Oporto, Portugal",
  "Londres, Reino Unido","Manchester, Reino Unido","Birmingham, Reino Unido","Glasgow, Reino Unido",
  "París, Francia","Lyon, Francia","Marsella, Francia",
  "Berlín, Alemania","Múnich, Alemania","Hamburgo, Alemania","Frankfurt, Alemania","Colonia, Alemania",
  "Roma, Italia","Milán, Italia","Nápoles, Italia","Turín, Italia",
  "Ámsterdam, Países Bajos","Rotterdam, Países Bajos",
  "Bruselas, Bélgica","Zürich, Suiza","Ginebra, Suiza","Viena, Austria",
  "Varsovia, Polonia","Budapest, Hungría","Praga, Rep. Checa","Estocolmo, Suecia",
  "Oslo, Noruega","Copenhague, Dinamarca","Helsinki, Finlandia",
  "Zagreb, Croacia","Sarajevo, Bosnia-Herz.","Belgrado, Serbia","Bucarest, Rumanía",
  "Sofía, Bulgaria","Atenas, Grecia","Estambul, Türkiye","Moscú, Rusia",
  // África
  "Ciudad del Cabo, Sudáfrica","Johannesburgo, Sudáfrica","Nairobi, Kenia",
  "Lagos, Nigeria","Accra, Ghana","Casablanca, Marruecos","El Cairo, Egipto",
  "Dakar, Senegal","Abiyán, Costa de Marfil","Túnez, Túnez",
  // Asia
  "Tokio, Japón","Osaka, Japón","Seúl, Corea del Sur","Busán, Corea del Sur",
  "Pekín, China","Shanghái, China","Hong Kong, China",
  "Doha, Catar","Riad, Arabia Saudita","Dubái, Emiratos Árabes",
  "Teherán, Irán","Bagdad, Iraq","Amán, Jordania","Taskent, Uzbekistán",
  "Mumbai, India","Delhi, India","Bangalore, India",
  // Oceanía
  "Sídney, Australia","Melbourne, Australia","Brisbane, Australia",
  "Auckland, Nueva Zelanda","Wellington, Nueva Zelanda",
];


// ═══ JUGADORES POR SELECCIÓN ══════════════════════════════════════════
const PLAYERS_BY_COUNTRY = {
  "🇳🇴 Noruega":      ["Erling Haaland","Alexander Sørloth","Martin Ødegaard"],
  "🇫🇷 Francia":      ["Kylian Mbappé","Antoine Griezmann","Ousmane Dembélé","Randal Kolo Muani","Marcus Thuram"],
  "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra":   ["Harry Kane","Bukayo Saka","Phil Foden","Jude Bellingham","Cole Palmer"],
  "🇧🇷 Brasil":       ["Vinicius Jr.","Rodrygo","Richarlison","Raphinha","Gabriel Martinelli","Endrick"],
  "🇦🇷 Argentina":    ["Lionel Messi","Lautaro Martínez","Julián Álvarez","Ángel Di María","Paulo Dybala"],
  "🇪🇸 España":       ["Lamine Yamal","Pedri","Dani Olmo","Álvaro Morata","Ferran Torres","Gavi"],
  "🇩🇪 Alemania":     ["Florian Wirtz","Jamal Musiala","Thomas Müller","Kai Havertz","Niclas Füllkrug"],
  "🇵🇹 Portugal":     ["Cristiano Ronaldo","Rafael Leão","Bruno Fernandes","Bernardo Silva","João Félix","Rúben Neves"],
  "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escocia":     ["Scott McTominay","Andy Robertson","Che Adams","Lawrence Shankland"],
  "🇭🇷 Croacia":      ["Luka Modrić","Ivan Perišić","Andrej Kramarić","Bruno Petković"],
  "🇳🇱 P. Bajos":     ["Cody Gakpo","Memphis Depay","Virgil van Dijk","Xavi Simons","Wout Weghorst"],
  "🇧🇪 Bélgica":      ["Romelu Lukaku","Kevin De Bruyne","Dodi Lukébakio","Leandro Trossard"],
  "🇨🇴 Colombia":     ["Luis Díaz","James Rodríguez","Jhon Durán","Cucho Hernández","Rafael Santos Borré"],
  "🇺🇾 Uruguay":      ["Darwin Núñez","Luis Suárez","Rodrigo Bentancur","Federico Valverde"],
  "🇲🇽 México":       ["Santiago Giménez","Hirving Lozano","Alexis Vega","Henry Martín","Edson Álvarez"],
  "🇺🇸 EE.UU.":      ["Christian Pulisic","Gio Reyna","Brenden Aaronson","Josh Sargent","Ricardo Pepi"],
  "🇲🇦 Marruecos":    ["Hakim Ziyech","Achraf Hakimi","Youssef En-Nesyri","Sofyan Amrabat","Azzedine Ounahi"],
  "🇸🇳 Senegal":      ["Sadio Mané","Ismaïla Sarr","Pape Gueye","Idrissa Gueye","Boulaye Dia"],
  "🇯🇵 Japón":        ["Takumi Minamino","Ritsu Doan","Daichi Kamada","Kaoru Mitoma","Wataru Endō"],
  "🇰🇷 Corea del Sur":["Son Heung-min","Hwang Hee-chan","Kwon Chang-hoon","Lee Kang-in","Cho Gue-sung"],
  "🇪🇨 Ecuador":      ["Enner Valencia","Kendry Páez","Moisés Caicedo","Ángel Mena","Jeremy Sarmiento"],
  "🇨🇦 Canadá":       ["Alphonso Davies","Jonathan David","Tajon Buchanan","Cyle Larin","Stephen Eustáquio"],
  "🇦🇺 Australia":    ["Mat Leckie","Harry Souttar","Martin Boyle","Adam Taggart","Ajdin Hrustic"],
  "🇵🇾 Paraguay":     ["Miguel Almirón","Julio Enciso","Junior Alonso","Antonio Sanabria"],
  "🇬🇭 Ghana":        ["Mohammed Kudus","Thomas Partey","Jordan Ayew","Antoine Semenyo"],
  "🇵🇦 Panamá":       ["Rolando Blackburn","Alfredo Stephens","César Yanis","Adalberto Carrasquilla"],
  "🇿🇦 Sudáfrica":    ["Percy Tau","Themba Zwane","Evidence Makgopa","Lyle Foster"],
  "🇿🇦 Chequia":      ["Patrik Schick","Tomáš Souček","Vladimír Coufal","Antonín Barák"],
  "🇧🇦 Bosnia-Herz.": ["Edin Džeko","Haris Hajradinović","Sead Kolašinac","Amar Dedić"],
  "🇨🇭 Suiza":        ["Xherdan Shaqiri","Granit Xhaka","Breel Embolo","Ruben Vargas","Silvan Widmer"],
  "🇶🇦 Catar":        ["Almoez Ali","Akram Afif","Hassan Al-Haydos","Abdelkarim Hassan"],
  "🇮🇷 Irán":         ["Mehdi Taremi","Sardar Azmoun","Karim Ansarifard","Ali Gholizadeh"],
  "🇪🇬 Egipto":       ["Mohamed Salah","Trezeguet","Omar Marmoush","Mostafa Mohamed"],
  "🇳🇿 N. Zelanda":   ["Chris Wood","Clayton Lewis","Liberato Cacace","Ryan Thomas"],
  "🇸🇦 A. Saudita":   ["Salem Al-Dawsari","Mohammed Al-Shehri","Firas Al-Buraikan","Saleh Al-Shehri"],
  "🇨🇻 Cabo Verde":   ["Ryan Mendes","Garry Rodrigues","Nuno Borges","Stopira"],
  "🇮🇶 Iraq":         ["Aymen Hussein","Ahmed Yasin","Amjed Attwan","Mohanad Laftah"],
  "🇯🇴 Jordania":     ["Ahmad Hayel","Baha'a Faisal","Musa Al-Taima","Hamzeh Al-Dardour"],
  "🇩🇿 Argelia":      ["Riyad Mahrez","Islam Slimani","Baghdad Bounedjah","Youcef Atal"],
  "🇦🇹 Austria":      ["David Alaba","Marko Arnautovic","Marcel Sabitzer","Konrad Laimer"],
  "🇨🇩 DR Congo":     ["Yannick Bolasie","Cedric Bakambu","Chancel Mbemba","Fiston Mayele"],
  "🇺🇿 Uzbekistán":   ["Eldor Shomurodov","Otabek Shukurov","Jaloliddin Masharipov","Jasur Yakhshiboev"],
  "🇹🇷 Türkiye":      ["Arda Güler","Hakan Çalhanoğlu","Kerem Aktürkoğlu","Burak Yılmaz","Cenk Tosun"],
  "🇭🇹 Haití":        ["Duckens Nazon","Frantzdy Pierrot","Sébastien Breza","James Léandre"],
  "🇨🇼 Curazao":      ["Cuco Martina","Leandro Bacuna","Jurickson Profar","Randel Leal"],
  "🇨🇮 C. de Marfil": ["Wilfried Zaha","Sébastien Haller","Nicolas Pépé","Franck Kessié","Terem Moffi"],
  "🇸🇪 Suecia":       ["Zlatan Ibrahimović","Alexander Isak","Victor Nilsson Lindelöf","Emil Forsberg","Dejan Kulusevski"],
  "🇹🇳 Túnez":        ["Youssef Msakni","Wahbi Khazri","Hannibal Mejbri","Ellyes Skhiri"],
  "🇷🇸 Escocia":      ["Scott McTominay","Andy Robertson","Che Adams","Lawrence Shankland"],
};

const COUNTRIES_LIST = Object.keys(PLAYERS_BY_COUNTRY).sort();

// ═══ CSS ══════════════════════════════════════════════════════════════
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{--gold:#f0b429;--gold2:#c8841a;--gdim:rgba(240,180,41,.10);--gbor:rgba(240,180,41,.20);--green:#10b981;--gdim2:rgba(16,185,129,.10);--red:#f43f5e;--rdim:rgba(244,63,94,.10);--blue:#60a5fa;--bdim:rgba(96,165,250,.10);--txt:#f0f4ff;--txs:#8892aa;--bg:#08090e;--sur:#0e1018;--su2:#14161f;--bor:rgba(240,180,41,.12);--bos:rgba(255,255,255,.06);}
html,body{background:var(--bg);min-height:100%;}
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;}
input[type=number]{-moz-appearance:textfield;appearance:textfield;}
.app{min-height:100vh;color:var(--txt);font-family:'Barlow',sans-serif;}
.bg{position:fixed;inset:0;z-index:0;background:radial-gradient(ellipse 80% 50% at 50% -20%,rgba(240,180,41,.06) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 80% 100%,rgba(16,185,129,.04) 0%,transparent 50%),var(--bg);}
.bg::after{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(240,180,41,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(240,180,41,.025) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(ellipse 100% 100% at 50% 0%,black 30%,transparent 80%);}
.rel{position:relative;z-index:1;}
.btn{padding:10px 22px;border:none;cursor:pointer;border-radius:7px;font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;transition:all .2s;display:inline-flex;align-items:center;gap:6px;}
.btn:disabled{opacity:.4;cursor:not-allowed;}
.btn-gold{background:linear-gradient(135deg,var(--gold),var(--gold2));color:#08090e;}.btn-gold:hover:not(:disabled){filter:brightness(1.12);transform:translateY(-2px);box-shadow:0 8px 28px rgba(240,180,41,.3);}
.btn-ol{background:transparent;color:var(--txt);border:1px solid var(--bos);}.btn-ol:hover{border-color:var(--gbor);color:var(--gold);}
.btn-gr{background:var(--green);color:#08090e;}.btn-gr:hover:not(:disabled){filter:brightness(1.1);}
.btn-rd{background:var(--red);color:#fff;}
.btn-bl{background:var(--blue);color:#08090e;}
.btn-sm{padding:6px 13px;font-size:12px;border-radius:6px;}.btn-xs{padding:4px 9px;font-size:10px;letter-spacing:1px;border-radius:5px;}
.land{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;text-align:center;}
.lt{font-family:'Bebas Neue',cursive;font-size:clamp(13px,4.5vw,21px);color:var(--gold);letter-spacing:12px;opacity:.8;animation:fid .6s ease both;}
.lt2{font-family:'Bebas Neue',cursive;font-size:clamp(60px,12vw,120px);color:#fff;letter-spacing:5px;line-height:.88;animation:fid .7s .08s ease both;text-shadow:0 0 80px rgba(240,180,41,.15);}
.lt3{font-family:'Bebas Neue',cursive;font-size:clamp(60px,12vw,120px);color:var(--gold);letter-spacing:5px;line-height:.88;animation:fid .7s .16s ease both;text-shadow:0 0 80px rgba(240,180,41,.35);}
.ls{font-family:'Barlow Condensed',sans-serif;font-size:clamp(10px,1.8vw,14px);color:var(--txs);letter-spacing:6px;text-transform:uppercase;margin-top:12px;animation:fid .7s .28s ease both;}
.lball{font-size:50px;margin:14px 0 18px;display:inline-block;animation:spinball 20s linear infinite,fi 1s ease;}
.lsep{width:50px;height:1px;background:var(--gbor);margin:16px auto 18px;animation:fi .7s .4s ease both;}
.ni{background:var(--su2);border:1px solid var(--bos);border-radius:8px;color:var(--txt);font-family:'Barlow',sans-serif;font-size:16px;padding:12px 18px;width:280px;outline:none;text-align:center;transition:border-color .2s;}
.ni:focus{border-color:var(--gbor);box-shadow:0 0 0 3px rgba(240,180,41,.08);}
.si{width:40px;height:40px;background:var(--su2);border:1px solid var(--bos);border-radius:7px;color:var(--txt);font-family:'Bebas Neue',cursive;font-size:22px;text-align:center;outline:none;transition:all .2s;}
.si:focus{border-color:var(--gbor);}.si:disabled{opacity:.4;}
.tsel{flex:1;background:var(--su2);border:1px solid var(--bos);border-radius:6px;color:var(--txt);font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:600;padding:8px 9px;outline:none;cursor:pointer;}
.tsel:focus{border-color:var(--gbor);}.tsel option,.ds option,.ti option,.spsel option{background:#14161f;}
.spsel{width:100%;background:var(--su2);border:2px solid var(--gbor);border-radius:9px;color:var(--txt);font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:600;padding:11px 13px;outline:none;cursor:pointer;}
.spsel:focus{border-color:var(--gold);}
.ti{background:var(--su2);border:1px solid var(--bos);border-radius:6px;color:var(--txt);font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:600;padding:7px 9px;outline:none;width:100%;}
.ti:focus{border-color:var(--gbor);}
.ds{width:100%;background:var(--su2);border:1px solid var(--bos);border-radius:8px;color:var(--txt);font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:600;padding:10px 12px;outline:none;cursor:pointer;}
.ds:focus{border-color:var(--green);}
.pl{display:flex;min-height:100vh;}
.sb{width:208px;background:rgba(8,9,14,.97);border-right:1px solid var(--bos);padding:9px 6px;display:flex;flex-direction:column;gap:1px;position:sticky;top:0;height:100vh;overflow-y:auto;flex-shrink:0;}
.sbl{font-family:'Bebas Neue',cursive;font-size:12px;color:var(--gold);text-align:center;padding:7px 4px 9px;letter-spacing:4px;border-bottom:1px solid var(--bos);margin-bottom:6px;opacity:.7;}
.sbs{font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(136,146,170,.5);padding:7px 8px 3px;}
.gb{display:flex;align-items:center;gap:5px;padding:6px 9px;border:none;background:transparent;color:var(--txs);cursor:pointer;border-radius:7px;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:600;letter-spacing:1px;transition:all .15s;text-align:left;width:100%;}
.gb:hover{background:rgba(255,255,255,.04);color:var(--txt);}
.gb.act{background:var(--gdim);color:var(--gold);border-left:2px solid var(--gold);padding-left:7px;}
.gb.ko{background:var(--bdim);color:var(--blue);border-left:2px solid var(--blue);padding-left:7px;}
.gb.sp{background:var(--gdim);color:var(--gold);border-left:2px solid var(--gold);padding-left:7px;}
.ma{flex:1;padding:22px;overflow-y:auto;max-height:100vh;}
.gh{font-family:'Bebas Neue',cursive;font-size:46px;color:var(--gold);letter-spacing:5px;line-height:1;}
.gts{display:flex;gap:6px;flex-wrap:wrap;margin:7px 0 16px;}
.tc{background:rgba(255,255,255,.04);border:1px solid var(--bos);border-radius:20px;padding:3px 11px;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:600;color:var(--txs);}
.stit{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(136,146,170,.6);margin-bottom:8px;margin-top:18px;}
.mr{display:flex;align-items:center;gap:7px;background:var(--sur);border:1px solid var(--bos);border-radius:10px;padding:8px 11px;margin-bottom:6px;transition:border-color .2s;}
.mr:hover{border-color:var(--bor);}
.tn{font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:600;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.tn.r{text-align:right;}
.vs{font-family:'Bebas Neue',cursive;color:rgba(136,146,170,.4);font-size:11px;min-width:12px;text-align:center;}
.sr{display:flex;align-items:center;gap:9px;background:var(--sur);border:1px solid var(--bos);border-radius:10px;padding:9px 12px;margin-bottom:6px;}
.pos{font-family:'Bebas Neue',cursive;font-size:20px;color:var(--gold);min-width:23px;text-align:center;}
.pb{height:2px;background:rgba(255,255,255,.06);border-radius:2px;margin-bottom:5px;}
.pf{height:100%;background:linear-gradient(90deg,var(--gold2),var(--gold));border-radius:2px;transition:width .5s;}
.lbr{display:flex;align-items:center;gap:11px;padding:11px 15px;border-radius:10px;border:1px solid var(--bos);margin-bottom:6px;background:var(--sur);transition:all .2s;}
.lbr:hover{border-color:var(--bor);background:var(--su2);}
.lbr.first{border-color:rgba(240,180,41,.3);background:linear-gradient(135deg,rgba(240,180,41,.06),var(--sur));}
.rnk{font-family:'Bebas Neue',cursive;font-size:25px;min-width:36px;color:var(--txs);}
.rnkg{color:var(--gold);text-shadow:0 0 20px rgba(240,180,41,.4);}.rnks{color:#94a3b8;}.rnkb{color:#92400e;}
.lbn{flex:1;font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:700;}
.lbp{font-family:'Bebas Neue',cursive;font-size:27px;color:var(--gold);}
.lbsub{font-family:'Barlow Condensed',sans-serif;font-size:11px;color:var(--txs);display:flex;gap:7px;flex-wrap:wrap;margin-top:2px;}
.fsc{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:8px;margin-bottom:16px;}
.fss{background:var(--sur);border:1px solid var(--bos);border-radius:10px;padding:13px;text-align:center;}
.fse{font-size:24px;margin-bottom:3px;}.fst{font-family:'Barlow Condensed',sans-serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--txs);margin-bottom:3px;}
.fsv{font-family:'Bebas Neue',cursive;font-size:14px;color:var(--txt);line-height:1.2;}.fss2{color:var(--txs);font-size:10px;font-family:'Barlow Condensed',sans-serif;margin-top:2px;}
.atab{display:flex;gap:5px;margin-bottom:14px;flex-wrap:wrap;}
.atb{padding:5px 12px;border:1px solid var(--bos);border-radius:6px;background:transparent;color:var(--txs);cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;letter-spacing:1px;transition:all .2s;}
.atb.act{background:var(--gdim);border-color:var(--gbor);color:var(--gold);}
.badge{display:inline-block;padding:3px 9px;border-radius:20px;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;letter-spacing:1px;}
.badge-g{background:var(--gdim);color:var(--gold);border:1px solid var(--gbor);}
.badge-gr{background:var(--gdim2);color:var(--green);border:1px solid rgba(16,185,129,.25);}
.badge-r{background:var(--rdim);color:#fca5a5;border:1px solid rgba(244,63,94,.25);}
.badge-b{background:var(--bdim);color:var(--blue);border:1px solid rgba(96,165,250,.25);}
.ko-hdr{display:flex;align-items:center;gap:11px;margin-bottom:14px;}
.ko-tit{font-family:'Bebas Neue',cursive;font-size:34px;letter-spacing:4px;line-height:1;}
.ko-lk{background:var(--sur);border:1px solid var(--bos);border-radius:12px;padding:26px;text-align:center;}
.ko-mr{display:flex;align-items:center;gap:7px;background:var(--sur);border:1px solid var(--bos);border-radius:10px;padding:9px 12px;margin-bottom:6px;flex-wrap:wrap;}
.ko-pen{display:flex;gap:8px;align-items:center;padding:7px 11px;background:var(--gdim);border:1px solid var(--gbor);border-radius:8px;margin-top:-3px;margin-bottom:7px;flex-wrap:wrap;}
.kpb{padding:5px 12px;border:1px solid var(--bos);border-radius:20px;background:transparent;color:var(--txs);cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;transition:all .2s;}
.kpb:hover{border-color:var(--gbor);color:var(--gold);}.kpb.sel{background:var(--gdim);border-color:var(--gold);color:var(--gold);}
.rndb{background:var(--bdim);color:var(--blue);font-family:'Bebas Neue',cursive;font-size:9px;padding:2px 6px;border-radius:10px;border:1px solid rgba(96,165,250,.2);}
.rndb.lk{background:var(--rdim);color:#fca5a5;border-color:rgba(244,63,94,.2);}
.fw{max-width:500px;margin:18px auto 0;}
.ftabs{display:flex;border-radius:8px 8px 0 0;overflow:hidden;border:1px solid var(--bos);border-bottom:none;}
.ftab{flex:1;padding:7px 2px;border:none;background:rgba(14,16,24,.9);color:var(--txs);cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;letter-spacing:.5px;transition:all .2s;text-align:center;}
.ftab.act{background:var(--gdim);color:var(--gold);}
.fcard{background:var(--sur);border:1px solid var(--bos);border-radius:0 0 12px 12px;padding:15px 17px;text-align:left;}
.fe{font-size:24px;margin-bottom:7px;display:block;}
.ft{font-family:'Barlow',sans-serif;font-size:13px;line-height:1.65;color:var(--txs);}
.fn{display:flex;gap:7px;margin-top:11px;justify-content:space-between;align-items:center;}
.fc{font-family:'Barlow Condensed',sans-serif;font-size:10px;color:rgba(136,146,170,.5);letter-spacing:2px;}
.sp-card{background:var(--sur);border:1px solid var(--gbor);border-radius:12px;padding:17px;margin-bottom:12px;}
.sp-tit{font-family:'Bebas Neue',cursive;font-size:23px;letter-spacing:3px;color:var(--gold);margin-bottom:5px;}
.sp-pts{display:inline-block;padding:3px 10px;background:var(--gdim);border:1px solid var(--gbor);border-radius:20px;font-family:'Barlow Condensed',sans-serif;font-size:11px;color:var(--gold);font-weight:700;margin-bottom:9px;}
.sbox{margin-top:13px;padding:11px 14px;background:var(--sur);border:1px solid var(--bos);border-radius:10px;}
.srow{font-family:'Barlow Condensed',sans-serif;font-size:12px;color:var(--txs);padding:2px 0;display:flex;align-items:center;gap:6px;}
.spts{font-family:'Bebas Neue',cursive;font-size:15px;color:var(--gold);}
.sttbl{width:100%;border-collapse:collapse;margin-top:9px;font-family:'Barlow Condensed',sans-serif;}
.sttbl th{font-size:9px;letter-spacing:2px;color:var(--txs);text-align:center;padding:4px 3px;border-bottom:1px solid var(--bos);text-transform:uppercase;opacity:.6;}
.sttbl th:first-child{text-align:left;}
.sttbl td{padding:6px 3px;text-align:center;font-size:12px;font-weight:600;border-bottom:1px solid rgba(255,255,255,.03);}
.sttbl td:first-child{text-align:left;}
.sttbl tr:last-child td{border-bottom:none;}
.ptsc{font-family:'Bebas Neue',cursive;font-size:17px;color:var(--gold);}
.stadv td{background:rgba(16,185,129,.04);}
.sg{display:grid;grid-template-columns:repeat(auto-fill,minmax(258px,1fr));gap:11px;margin-bottom:14px;}
.sc{background:var(--sur);border:1px solid var(--bos);border-radius:11px;padding:13px;}
.sct{font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--txs);margin-bottom:10px;opacity:.7;}
.brw{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
.brl{font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:600;min-width:82px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--txt);}
.brb{flex:1;height:6px;background:rgba(255,255,255,.05);border-radius:3px;overflow:hidden;}
.brf{height:100%;border-radius:3px;transition:width .5s;}
.brv{font-family:'Bebas Neue',cursive;font-size:14px;color:var(--gold);min-width:33px;text-align:right;}
.brc{font-family:'Barlow Condensed',sans-serif;font-size:10px;color:var(--txs);min-width:24px;}
.dl{font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--txs);margin-bottom:3px;opacity:.8;}
@keyframes fid{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes spinball{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@media(max-width:680px){
  .pl{flex-direction:column;}
  .sb{width:100%;height:auto;position:static;flex-direction:row;flex-wrap:nowrap;overflow-x:auto;padding:6px 5px;gap:3px;border-right:none;border-bottom:1px solid var(--bos);}
  .sbl,.sbs{display:none;}.ma{max-height:none;padding:13px 10px;}
  .gh,.ko-tit{font-size:30px;}.si{width:35px;height:35px;font-size:17px;}.tn{font-size:11px;}
  .sg{grid-template-columns:1fr;}.fsc{grid-template-columns:1fr 1fr;}
  .lt2,.lt3{font-size:clamp(52px,14vw,85px);}
.inst-scroll::-webkit-scrollbar{width:4px;}
.inst-scroll::-webkit-scrollbar-track{background:transparent;}
.inst-scroll::-webkit-scrollbar-thumb{background:var(--gbor);border-radius:2px;}
.sch-meta{display:flex;gap:10px;font-family:'Barlow Condensed',sans-serif;font-size:10px;color:var(--txs);letter-spacing:1px;margin-bottom:3px;padding-left:2px;flex-wrap:wrap;}
.sch-date{color:var(--gold);opacity:.85;font-weight:700;}
.sch-time{opacity:.6;}.sch-stad{opacity:.55;}
}`;
// ═══ APP ROOT ═════════════════════════════════════════════════════════
export default function App(){
  const [view,setView]=useState("landing");
  const [user,setUser]=useState(null);
  const [users,setUsers]=useState([]);
  const [allPreds,setAllPreds]=useState({});
  const [results,setResults]=useState({matches:{},standings:{}});
  const [koTeams,setKoTeams]=useState({});
  const [koResults,setKoResults]=useState({});
  const [koUnlocked,setKoUnlocked]=useState({r32:false,r16:false,qf:false,sf:false,tp:false,final:false});
  const [spRes,setSpRes]=useState({topScorer:null,goldenBall:null});
  const [locked,setLocked]=useState(false);
  const [loading,setLoading]=useState(true);
  const [nav,setNav]=useState({type:"group",id:"A"});

  useEffect(()=>{const s=document.createElement("style");s.textContent=CSS;document.head.appendChild(s);return()=>document.head.removeChild(s);},[]);
  useEffect(()=>{
    async function init(){
      const [us,ap,res,lk,kt,kr,ku,sr]=await Promise.all([ST.get("wc26:users"),ST.get("wc26:preds"),ST.get("wc26:results"),ST.get("wc26:locked"),ST.get("wc26:ko_teams"),ST.get("wc26:ko_results"),ST.get("wc26:ko_unlocked"),ST.get("wc26:special_results")]);
      if(us)setUsers(us);if(ap)setAllPreds(ap);if(res)setResults(res);if(lk!==null)setLocked(lk);
      if(kt)setKoTeams(kt);if(kr)setKoResults(kr);if(ku)setKoUnlocked(ku);if(sr)setSpRes(sr);
      setLoading(false);
    }
    init();
  },[]);

  const login=async(name,demo)=>{
    const t=name.trim();
    const ex=users.find(u=>u.name.toLowerCase()===t.toLowerCase());
    let u;
    if(ex){
      // Usuario existente: actualiza solo campos no vacíos
      const safe={};
      if(demo&&typeof demo==="object"){
        Object.entries(demo).forEach(([k,v])=>{
          if(v&&v!==""&&v!=="— Sin preferencia —") safe[k]=v;
        });
      }
      u={...ex,...safe};
    } else {
      u={id:Date.now().toString(),name:t,...(demo||{})};
    }
    const nu=ex?users.map(x=>x.id===u.id?u:x):[...users,u];
    setUsers(nu);await ST.set("wc26:users",nu);setUser(u);setView("predict");
  };
  const saveP=async(uid,p)=>{const up={...allPreds,[uid]:p};setAllPreds(up);await ST.set("wc26:preds",up);};
  const saveR=async r=>{setResults(r);await ST.set("wc26:results",r);};
  const saveKT=async t=>{setKoTeams(t);await ST.set("wc26:ko_teams",t);};
  const saveKR=async r=>{setKoResults(r);await ST.set("wc26:ko_results",r);};
  const saveKU=async u=>{setKoUnlocked(u);await ST.set("wc26:ko_unlocked",u);};
  const saveSR=async s=>{setSpRes(s);await ST.set("wc26:special_results",s);};
  const deleteUser=async uid=>{
    const nu=users.filter(u=>u.id!==uid);
    setUsers(nu);await ST.set("wc26:users",nu);
    const np={...allPreds};delete np[uid];
    setAllPreds(np);await ST.set("wc26:preds",np);
  };
  const saveUsers=async nu=>{setUsers(nu);await ST.set("wc26:users",nu);};
  const toggleLock=async()=>{const nl=!locked;setLocked(nl);await ST.set("wc26:locked",nl);};

  const lb=users.map(u=>({...u,...calcScore(allPreds[u.id]||{matches:{},standings:{},ko:{},special:{}},results,koTeams,koResults,koUnlocked,spRes)})).sort((a,b)=>b.total-a.total);

  if(loading)return(<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#08090e",color:"#f0b429",fontFamily:"'Barlow',sans-serif",fontSize:18,flexDirection:"column",gap:14}}><span style={{fontSize:44,display:"inline-block",animation:"spinball 2s linear infinite"}}>⚽</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"3px",textTransform:"uppercase",fontSize:13,opacity:.6}}>Cargando Polla Mundialista...</span></div>);

  const up=user?(allPreds[user.id]||{matches:{},standings:{},ko:{},special:{}}):{matches:{},standings:{},ko:{},special:{}};
  return(
    <div className="app">
      <div className="bg"/><div className="rel">
        {view==="landing"&&<Landing onLogin={login} onAdmin={()=>setView("admin")} onLB={()=>setView("lb")} onHoy={()=>setView("hoy")} locked={locked} users={users} allPreds={allPreds}/>}
        {view==="predict"&&user&&<PredictView user={user} preds={up} onSave={p=>saveP(user.id,p)} onLB={()=>setView("lb")} onOut={()=>{setUser(null);setView("landing");}} onHoy={()=>setView("hoy")} locked={locked} nav={nav} setNav={setNav} results={results} koTeams={koTeams} koResults={koResults} koUnlocked={koUnlocked} spRes={spRes}/>}
        {view==="lb"&&<LBView lb={lb} results={results} koUnlocked={koUnlocked} users={users} allPreds={allPreds} onBack={()=>setView(user?"predict":"landing")}/>}
        {view==="hoy"&&<HoyView results={results} allPreds={allPreds} users={users} lb={lb} onBack={()=>setView(user?"predict":"landing")}/>}
        {view==="admin"&&<AdminView results={results} onSaveR={saveR} locked={locked} onToggle={toggleLock} onBack={()=>setView("landing")} users={users} allPreds={allPreds} lb={lb} koTeams={koTeams} onSaveKT={saveKT} koResults={koResults} onSaveKR={saveKR} koUnlocked={koUnlocked} onSaveKU={saveKU} spRes={spRes} onSaveSR={saveSR} onDeleteUser={deleteUser} onSaveUsers={saveUsers}/>}
      </div>
    </div>
  );
}

// ═══ LANDING ══════════════════════════════════════════════════════════

// ═══ CITY AUTOCOMPLETE ════════════════════════════════════════════════
function CityAutocomplete({value,onChange}){
  const [q,setQ]=useState(value||"");
  const [open,setOpen]=useState(false);
  const filtered=q.length>=2?CITIES.filter(c=>c.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").includes(q.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,""))).slice(0,8):[];
  const pick=c=>{setQ(c);onChange(c);setOpen(false);};
  return(
    <div style={{position:"relative",width:"100%"}}>
      <input className="ni" style={{width:"100%",textAlign:"left",fontSize:14,padding:"9px 12px"}}
        placeholder="Ej: Bogotá..." value={q}
        onChange={e=>{setQ(e.target.value);onChange(e.target.value);setOpen(true);}}
        onFocus={()=>setOpen(true)}
        onBlur={()=>setTimeout(()=>setOpen(false),180)}
        autoComplete="off"/>
      {open&&filtered.length>0&&(
        <div style={{position:"absolute",top:"100%",left:0,right:0,background:"var(--su2)",border:"1px solid var(--gbor)",borderRadius:"0 0 8px 8px",zIndex:99,maxHeight:220,overflowY:"auto",boxShadow:"0 8px 24px rgba(0,0,0,.5)"}}>
          {filtered.map(c=>(
            <div key={c} onMouseDown={()=>pick(c)}
              style={{padding:"9px 14px",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:600,color:"var(--txt)",borderBottom:"1px solid rgba(255,255,255,.04)",transition:"background .1s"}}
              onMouseEnter={e=>e.currentTarget.style.background="var(--gdim)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              {c}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Instructions(){
  const [tab,setTab]=useState("grupos");
  const tabs=[["grupos","⚽ Grupos"],["ko","⚔️ Eliminación"],["especiales","🌟 Especiales"],["puntos","📊 Puntos"]];
  return(
    <div style={{width:"100%",background:"var(--sur)",border:"1px solid var(--bos)",borderRadius:12,overflow:"hidden"}}>
      <div style={{display:"flex",borderBottom:"1px solid var(--bos)"}}>
        {tabs.map(([k,l])=><button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"9px 4px",border:"none",background:tab===k?"var(--gdim)":"transparent",color:tab===k?"var(--gold)":"var(--txs)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,fontWeight:700,letterSpacing:"1px",cursor:"pointer",transition:"all .15s"}}>{l}</button>)}
      </div>
      <div style={{padding:"15px 17px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,color:"var(--txs)",lineHeight:1.7,maxHeight:320,overflowY:"auto"}}>
        {tab==="grupos"&&<div>
          <div style={{color:"var(--gold)",fontWeight:700,fontSize:15,marginBottom:8,fontFamily:"'Bebas Neue',cursive",letterSpacing:"2px"}}>FASE DE GRUPOS (11 — 27 JUN)</div>
          <p>El mundial tiene <strong style={{color:"var(--txt)"}}>12 grupos (A a L)</strong>, cada uno con 4 equipos. Cada equipo juega 3 partidos contra los otros del grupo.</p>
          <p style={{marginTop:7}}>Para cada partido debes predecir el <strong style={{color:"var(--txt)"}}>marcador exacto</strong> (ej: 2-1). La clasificación final del grupo se calcula automáticamente según los criterios FIFA.</p>
          <div style={{marginTop:10,background:"rgba(240,180,41,.06)",border:"1px solid var(--gbor)",borderRadius:8,padding:"9px 11px",fontSize:13}}>
            <div style={{color:"var(--gold)",marginBottom:3}}>💡 Tip</div>
            Los partidos aparecen en orden cronológico. Los últimos 2 de cada grupo se juegan <strong style={{color:"var(--txt)"}}>simultáneamente</strong>.
          </div>
        </div>}
        {tab==="ko"&&<div>
          <div style={{color:"var(--blue)",fontWeight:700,fontSize:15,marginBottom:8,fontFamily:"'Bebas Neue',cursive",letterSpacing:"2px"}}>FASE ELIMINATORIA (28 JUN — 19 JUL)</div>
          <p>Clasifican los <strong style={{color:"var(--txt)"}}>2 primeros de cada grupo + 8 mejores terceros</strong> = 32 equipos.</p>
          <div style={{marginTop:7,display:"flex",flexDirection:"column",gap:4}}>
            {[["⚔️","Dieciseisavos","Jun 28–Jul 3"],["🏟️","Octavos de Final","Jul 4–7"],["⚡","Cuartos de Final","Jul 9–11"],["🔥","Semifinales","Jul 14–15"],["🥉","Tercer Puesto","Jul 18"],["🏆","GRAN FINAL","Jul 19 — MetLife, NJ"]].map(([e,n,d])=>(
              <div key={n} style={{display:"flex",gap:8,alignItems:"center",background:"rgba(255,255,255,.03)",borderRadius:6,padding:"5px 9px"}}>
                <span style={{fontSize:15}}>{e}</span>
                <span style={{color:"var(--txt)",flex:1,fontWeight:700,fontSize:13}}>{n}</span>
                <span style={{color:"var(--gold)",fontSize:11}}>{d}</span>
              </div>
            ))}
          </div>
          <div style={{marginTop:9,background:"rgba(96,165,250,.06)",border:"1px solid rgba(96,165,250,.2)",borderRadius:8,padding:"9px 11px",fontSize:13}}>
            <div style={{color:"var(--blue)",marginBottom:3}}>💡 ¿Cuándo puedo hacer los pronósticos?</div>
            El administrador <strong style={{color:"var(--txt)"}}>activa cada fase</strong> cuando están definidos los clasificados.
          </div>
        </div>}
        {tab==="especiales"&&<div>
          <div style={{color:"var(--gold)",fontWeight:700,fontSize:15,marginBottom:8,fontFamily:"'Bebas Neue',cursive",letterSpacing:"2px"}}>PICKS ESPECIALES</div>
          {[["👟","Goleador del Torneo","15 pts","El que más goles marque en todo el mundial"],["⭐","Balón de Oro","10 pts","El mejor jugador según la FIFA al finalizar"]].map(([e,t,p,d])=>(
            <div key={t} style={{background:"rgba(240,180,41,.05)",border:"1px solid var(--gbor)",borderRadius:8,padding:"10px 12px",marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <span style={{fontSize:18}}>{e}</span>
                <span style={{color:"var(--txt)",fontWeight:700,fontSize:13,flex:1}}>{t}</span>
                <span style={{background:"var(--gdim)",padding:"2px 9px",borderRadius:20,color:"var(--gold)",fontSize:12,fontWeight:700,border:"1px solid var(--gbor)"}}>{p}</span>
              </div>
              <div style={{fontSize:12,color:"var(--txs)"}}>{d}</div>
            </div>
          ))}
          <div style={{background:"rgba(244,63,94,.06)",border:"1px solid rgba(244,63,94,.2)",borderRadius:8,padding:"9px 11px",fontSize:12,marginTop:4}}>
            <span style={{color:"#fca5a5"}}>⚠️ Importante:</span> Los resultados se revelan al final del torneo (19 Jul).
          </div>
        </div>}
        {tab==="puntos"&&<div>
          <div style={{color:"var(--gold)",fontWeight:700,fontSize:15,marginBottom:8,fontFamily:"'Bebas Neue',cursive",letterSpacing:"2px"}}>SISTEMA DE PUNTUACIÓN</div>
          <div style={{color:"var(--green)",fontSize:10,letterSpacing:"2px",marginBottom:5,opacity:.8}}>FASE DE GRUPOS</div>
          {[["✅","Resultado correcto","3 pts"],["🎯","Marcador exacto","5 pts"],["📊","Posición exacta en el grupo","2 pts"],["🔢","Puntos exactos del equipo","1 pt"],["⭐","Grupo perfecto (todo exacto)","+10 BONUS"]].map(([e,l,p])=>(
            <div key={l} style={{display:"flex",gap:8,alignItems:"center",padding:"3px 0",borderBottom:"1px solid rgba(255,255,255,.03)"}}>
              <span style={{fontSize:14}}>{e}</span>
              <span style={{flex:1,fontSize:13,color:"var(--txt)"}}>{l}</span>
              <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:16,color:"var(--gold)"}}>{p}</span>
            </div>
          ))}
          <div style={{color:"var(--blue)",fontSize:10,letterSpacing:"2px",margin:"9px 0 5px",opacity:.8}}>ELIMINACIÓN DIRECTA</div>
          {[["✅","Ganador correcto","4 pts"],["🎯","Marcador exacto","8 pts"],["🥊","Ganador por penales","+3 pts"],["⭐","Ronda perfecta","+5 BONUS"]].map(([e,l,p])=>(
            <div key={l} style={{display:"flex",gap:8,alignItems:"center",padding:"3px 0"}}>
              <span style={{fontSize:14}}>{e}</span>
              <span style={{flex:1,fontSize:13,color:"var(--txt)"}}>{l}</span>
              <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:16,color:"var(--gold)"}}>{p}</span>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
}


function Landing({onLogin,onAdmin,onLB,onHoy,locked,users=[],allPreds={}}){
  const [name,setName]=useState("");
  const [step,setStep]=useState("home");
  const [demo,setDemo]=useState({sexo:"",edad:"",equipoFav:"",ciudad:""});

  const goNext=()=>{
    const t=name.trim();if(!t)return;
    // Si el nombre ya existe en el registro → entrar directo, sin pedir datos de nuevo
    const ex=users.find(u=>u.name.toLowerCase()===t.toLowerCase());
    if(ex){onLogin(t,ex);return;}
    // Nuevo usuario → mostrar perfil
    setStep("demo");
  };

  return(
    <div className="land">
      <div className="lt">Polla Mundialista</div>
      <div className="lt2">MUNDIAL</div>
      <div className="lt3">2026</div>
      <div className="ls">Canadá · México · EE.UU. · 11 Jun — 19 Jul</div>
      <span className="lball">⚽</span>
      <div className="lsep"/>

      {step==="home"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10,alignItems:"center",animation:"fi .5s ease"}}>
          {!locked
            ?<button className="btn btn-gold" onClick={()=>setStep("name")}>📝 Ingresar mis Pronósticos</button>
            :<div className="badge badge-r" style={{padding:"9px 18px",fontSize:13}}>🔒 Polla cerrada — ¡El mundial ya arrancó!</div>
          }
          <button className="btn btn-ol" onClick={onLB}>📊 Ver Tabla de Posiciones</button>
          <button className="btn btn-ol" onClick={onHoy}>📅 Partidos de Hoy</button>
          <button className="btn btn-ol btn-sm" style={{marginTop:4,opacity:.5}} onClick={onAdmin}>🔧 Administrador</button>
        </div>
      )}

      {step==="name"&&(
        <div style={{display:"flex",flexDirection:"column",gap:12,alignItems:"center",animation:"fi .4s ease"}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--txs)",letterSpacing:"3px",textTransform:"uppercase"}}>¿Con qué nombre juegas?</div>
          <input className="ni" placeholder="Tu nombre o apodo..."
            value={name} onChange={e=>setName(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&goNext()} autoFocus/>
          <div style={{display:"flex",gap:9}}>
            <button className="btn btn-ol btn-sm" onClick={()=>setStep("home")}>← Volver</button>
            <button className="btn btn-gold" onClick={goNext} disabled={!name.trim()}>Continuar →</button>
          </div>
          <div style={{color:"var(--txs)",fontSize:11,fontFamily:"'Barlow Condensed',sans-serif",opacity:.7,textAlign:"center",maxWidth:260}}>
            Si ya participaste antes, tu nombre te lleva directamente a tus pronósticos
          </div>
        </div>
      )}

      {step==="demo"&&(
        <div style={{display:"flex",flexDirection:"column",gap:13,alignItems:"center",animation:"fi .4s ease",width:"100%"}}>
          <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:21,color:"var(--gold)",letterSpacing:"5px"}}>Completa tu Perfil</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,color:"var(--txs)",textAlign:"center",maxWidth:300,lineHeight:1.5}}>
            Solo la primera vez. Datos opcionales para las estadísticas del grupo.
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:11,width:"100%",maxWidth:310}}>
            {[
              {f:"sexo",l:"Sexo",o:["","Hombre","Mujer"]},
              {f:"edad",l:"Rango de edad",o:["","Menor de 18","18–25","26–35","36–45","46–55","Mayor de 55"]},
              {f:"equipoFav",l:"Equipo favorito",o:["","— Sin preferencia —",...ALL_TEAMS]},
            ].map(({f,l,o})=>(
              <div key={f}><div className="dl">{l}</div>
                <select className="ds" value={demo[f]} onChange={e=>setDemo(d=>({...d,[f]:e.target.value}))}>
                  {o.map(x=><option key={x} value={x}>{x||"— Seleccionar —"}</option>)}
                </select>
              </div>
            ))}
            <div><div className="dl">Ciudad / País de nacimiento</div>
              <CityAutocomplete value={demo.ciudad} onChange={v=>setDemo(d=>({...d,ciudad:v}))}/>
            </div>
          </div>
          <div style={{display:"flex",gap:9,flexWrap:"wrap",justifyContent:"center"}}>
            <button className="btn btn-ol btn-sm" onClick={()=>setStep("name")}>← Volver</button>
            <button className="btn btn-ol btn-sm" onClick={()=>onLogin(name,{})}>Saltear</button>
            <button className="btn btn-gold" onClick={()=>setStep("instrucciones")}>Ver Instrucciones →</button>
          </div>
        </div>
      )}

      {step==="instrucciones"&&(
        <div style={{display:"flex",flexDirection:"column",gap:0,alignItems:"center",animation:"fi .4s ease",width:"100%",maxWidth:540,overflowY:"auto",maxHeight:"80vh",padding:"0 4px"}}>
          <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:26,color:"var(--gold)",letterSpacing:"5px",marginBottom:2,textAlign:"center"}}>¿Cómo funciona la Polla?</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,color:"var(--txs)",marginBottom:14,textAlign:"center",letterSpacing:"1px"}}>Leé esto antes de empezar — tarda 2 minutos</div>
          <Instructions/>
          <div style={{display:"flex",gap:9,flexWrap:"wrap",justifyContent:"center",marginTop:14}}>
            <button className="btn btn-ol btn-sm" onClick={()=>setStep("demo")}>← Volver</button>
            <button className="btn btn-gold" style={{fontSize:15}} onClick={()=>onLogin(name,demo)}>¡Entrar a la Polla! ⚽</button>
          </div>
        </div>
      )}
      <DailyFact/>
    </div>
  );
}

function DailyFact(){
  // Dato del día: avanza cada día calendario real, desde hoy mismo
  const today=Math.floor(Date.now()/86400000);
  const BASE_DAY=Math.floor(new Date('2026-05-29').getTime()/86400000); // Hoy = Día 1
  const dayOffset=today-BASE_DAY; // positivo desde hoy, crece cada día
  const [ci,setCi]=useState(0);
  const cat=FACT_CATS[ci];
  const fact=cat.facts[((dayOffset%cat.facts.length)+cat.facts.length)%cat.facts.length];
  const dateStr=new Date().toLocaleDateString('es-CO',{weekday:'long',day:'numeric',month:'long'});
  return(
    <div className="fw">
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:10,color:"var(--txs)",letterSpacing:"2px",textAlign:"center",marginBottom:4,opacity:.7,textTransform:"uppercase"}}>
        📖 Dato del Día — {dateStr}
      </div>
      <div className="ftabs">
        {FACT_CATS.map((c,i)=><button key={c.id} className={`ftab${ci===i?" act":""}`} onClick={()=>setCi(i)}>{c.label}</button>)}
      </div>
      <div className="fcard">
        <span className="fe">{fact.e}</span>
        <div className="ft">{fact.t}</div>
        <div style={{marginTop:10,fontFamily:"'Barlow Condensed',sans-serif",fontSize:9,color:"var(--txs)",opacity:.45,letterSpacing:"1.5px",textAlign:"right"}}>
          DÍA {dayOffset+1} · {(((dayOffset%cat.facts.length)+cat.facts.length)%cat.facts.length)+1}/{cat.facts.length}
        </div>
      </div>
    </div>
  );
}

// ═══ PREDICT VIEW ═════════════════════════════════════════════════════
function PredictView({user,preds,onSave,onLB,onOut,onHoy,locked,nav,setNav,results,koTeams,koResults,koUnlocked,spRes}){
  const [lp,setLp]=useState(preds);
  const [saving,setSaving]=useState(false);
  const [saved,setSaved]=useState(false);
  const gDone=GKS.filter(gk=>mkM(gk).every(({id})=>{const p=lp?.matches?.[id];return p&&p.h!==""&&p.a!=="";})&&mkM(gk).length===6).length;
  const save=async()=>{setSaving(true);await onSave(lp);setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),2500);};
  const updM=(id,h,a)=>setLp(p=>({...p,matches:{...p?.matches,[id]:{h,a}}}));
  const updSt=(gk,pos,t)=>{const c=[...(lp?.standings?.[gk]||[null,null,null,null])];for(let i=0;i<4;i++)if(c[i]===t&&i!==pos)c[i]=null;c[pos]=t||null;setLp(p=>({...p,standings:{...p?.standings,[gk]:c}}));};
  const updKO=(mid,f,v)=>setLp(p=>({...p,ko:{...p?.ko,[mid]:{...p?.ko?.[mid],[f]:v}}}));
  const updSp=(f,v)=>setLp(p=>({...p,special:{...p?.special,[f]:v}}));
  return(
    <div className="pl">
      <div className="sb">
        <div className="sbl">⚽ Polla 2026</div>
        <div style={{color:"var(--txs)",fontSize:11,fontFamily:"'Barlow Condensed',sans-serif",padding:"0 7px 6px",letterSpacing:"1px"}}>Hola, <strong style={{color:"var(--txt)"}}>{user.name}</strong></div>
        <div style={{padding:"0 7px 8px"}}><div className="pb"><div className="pf" style={{width:`${(gDone/12)*100}%`}}/></div><div style={{color:"var(--txs)",fontSize:10,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"1px"}}>{gDone}/12 grupos</div></div>
        <div className="sbs">Fase de Grupos</div>
        {GKS.map(gk=>{const done=mkM(gk).every(({id})=>{const p=lp?.matches?.[id];return p&&p.h!==""&&p.a!=="";});const a=nav.type==="group"&&nav.id===gk;return(<button key={gk} className={`gb${a?" act":""}`} onClick={()=>setNav({type:"group",id:gk})}><span style={{fontFamily:"'Bebas Neue',cursive",fontSize:12}}>Grupo {gk}</span><span style={{flex:1,fontSize:10}}>{GROUPS[gk].slice(0,2).map(t=>t.f).join("")}</span>{done&&<span style={{color:"var(--green)",fontSize:10}}>✓</span>}</button>);})}
        <div className="sbs">Eliminación Directa</div>
        {KO_ROUNDS.map(r=>{const u=koUnlocked?.[r.id],a=nav.type==="ko"&&nav.id===r.id;return(<button key={r.id} className={`gb${a?" ko":""}`} onClick={()=>setNav({type:"ko",id:r.id})}><span style={{fontFamily:"'Bebas Neue',cursive",fontSize:11}}>{r.short}</span><span style={{flex:1,fontSize:10,color:"var(--txs)"}}>{r.emoji}</span><span className={`rndb${!u?" lk":""}`}>{u?"OK":"PRÓX"}</span></button>);})}
        <div className="sbs">Picks Especiales</div>
        <button className={`gb${nav.type==="special"?" sp":""}`} onClick={()=>setNav({type:"special",id:"s"})}><span style={{fontFamily:"'Bebas Neue',cursive",fontSize:11}}>🌟 Picks</span><span style={{flex:1,fontSize:10,color:"var(--txs)"}}>Goleador·Balón</span>{lp?.special?.topScorer&&lp?.special?.goldenBall&&<span style={{color:"var(--gold)",fontSize:10}}>✓</span>}</button>
        <div style={{marginTop:"auto",padding:"8px 5px",display:"flex",flexDirection:"column",gap:5}}>
          {!locked&&<button className={`btn btn-sm ${saved?"btn-gr":"btn-gold"}`} style={{width:"100%",justifyContent:"center"}} onClick={save} disabled={saving}>{saving?"Guardando...":saved?"✅ Guardado":"💾 Guardar"}</button>}
          <button className="btn btn-ol btn-sm" style={{width:"100%",justifyContent:"center"}} onClick={onHoy}>📅 Hoy</button>
          <button className="btn btn-ol btn-sm" style={{width:"100%",justifyContent:"center"}} onClick={onLB}>📊 Tabla</button>
          <button className="btn btn-ol btn-sm" style={{width:"100%",justifyContent:"center"}} onClick={onOut}>← Salir</button>
        </div>
      </div>
      <div className="ma">
        {locked&&<div style={{background:"var(--rdim)",border:"1px solid rgba(244,63,94,.25)",borderRadius:8,padding:"9px 14px",marginBottom:14,fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"#fca5a5",letterSpacing:"1px"}}>🔒 La polla está cerrada. Solo puedes ver tus pronósticos.</div>}
        {nav.type==="group"&&<GroupPanel key={nav.id} gk={nav.id} preds={lp} results={results} onMC={updM} onSC={updSt} locked={locked}/>}
        {nav.type==="ko"&&<KOPanel key={nav.id} rid={nav.id} preds={lp} koTeams={koTeams} koResults={koResults} koUnlocked={koUnlocked} onUpd={updKO}/>}
        {nav.type==="special"&&<SpecialPanel preds={lp} spRes={spRes} onUpd={updSp} locked={locked}/>}
      </div>
    </div>
  );
}

// ═══ GROUP PANEL ══════════════════════════════════════════════════════
function GroupPanel({gk,preds,results,onMC,onSC,locked}){
  const teams=GROUPS[gk],ml=mkM(gk),st=preds?.standings?.[gk]||[null,null,null,null],med=["🥇","🥈","🥉","4️⃣"];
  const pRows=cStand(gk,preds?.matches),rRows=cStand(gk,results?.matches);
  const haP=pRows.some(s=>s.pj>0),haR=rRows.some(s=>s.pj>0);
  return(
    <div style={{animation:"fi .3s ease"}}>
      <div className="gh">GRUPO {gk}</div>
      <div className="gts">{teams.map(t=><span key={t.n} className="tc">{t.f} {t.n}</span>)}</div>
      <div className="stit">Marcadores</div>
      {ml.map(({id,h,a})=>{
        const mp=preds?.matches?.[id]||{h:"",a:""},rp=results?.matches?.[id];
        const pts=(rp&&rp.h!==""&&rp.a!==""&&mp.h!==""&&mp.a!=="")?sMatch(mp.h,mp.a,rp.h,rp.a):null;
        const isE=pts===5,isO=pts===3;
        let bc="var(--bos)";if(pts!==null)bc=isE?"rgba(240,180,41,.4)":isO?"rgba(16,185,129,.35)":"rgba(244,63,94,.35)";
        const sch=SCHEDULE[id]||SCHEDULE[`${gk}|${a.n}v${h.n}`];
        return(<div key={id} style={{marginBottom:8}}>
          {sch&&<div className="sch-meta">
            <span className="sch-date">📅 {sch.d}</span>
            <span className="sch-time">🕐 {sch.h} COL</span>
            <span className="sch-stad">🏟️ {sch.st}</span>
          </div>}
          <div className="mr" style={{borderColor:bc,marginBottom:0}}>
            <span className="tn">{h.f} {h.n}</span>
            <input className="si" type="number" min="0" max="20" value={mp.h} onChange={e=>!locked&&onMC(id,e.target.value,mp.a)} disabled={locked} placeholder="–"/>
            <span className="vs">VS</span>
            <input className="si" type="number" min="0" max="20" value={mp.a} onChange={e=>!locked&&onMC(id,mp.h,e.target.value)} disabled={locked} placeholder="–"/>
            <span className="tn r">{a.n} {a.f}</span>
            {rp&&rp.h!==""&&rp.a!==""&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:42,marginLeft:3}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:9,color:"var(--txs)",letterSpacing:"1px"}}>REAL</div><div style={{fontFamily:"'Bebas Neue',cursive",fontSize:18}}>{rp.h}:{rp.a}</div></div>}
            {pts!==null&&<span style={{fontFamily:"'Bebas Neue',cursive",fontSize:18,minWidth:27,textAlign:"right",color:isE?"var(--gold)":isO?"var(--green)":"var(--red)"}}>+{pts}</span>}
          </div>
        </div>);
      })}
      {(haP||haR)&&<div style={{display:"grid",gridTemplateColumns:haR?"1fr 1fr":"1fr",gap:14,marginTop:18}}>
        {haP&&<div><div className="stit" style={{marginTop:0,color:"var(--green)"}}>Tu tabla predicha</div><StTable rows={pRows} acc="rgba(16,185,129,.3)"/></div>}
        {haR&&<div><div className="stit" style={{marginTop:0,color:"var(--gold)"}}>Tabla real</div><StTable rows={rRows} acc="rgba(240,180,41,.3)" adv/></div>}
      </div>}
      <div className="stit" style={{marginTop:22}}>Clasificación final — tu pronóstico</div>
      {[0,1,2,3].map(i=>{const rp=results?.standings?.[gk]?.[i],pp=st[i],ok=rp&&pp&&rp===pp;return(<div key={i} className="sr" style={{borderColor:ok?"rgba(240,180,41,.35)":"var(--bos)"}}>
        <span className="pos">{med[i]}</span>
        <select className="tsel" value={st[i]||""} disabled={locked} onChange={e=>onSC(gk,i,e.target.value||null)}>
          <option value="">— Seleccionar equipo —</option>
          {teams.map(t=><option key={t.n} value={t.n} disabled={st.includes(t.n)&&st[i]!==t.n}>{t.f} {t.n}</option>)}
        </select>
        {rp&&<span className={`badge ${ok?"badge-g":"badge-r"}`}>{ok?"✓":"✗"} {rp}</span>}
      </div>);})}
      <ScoreInfo/>
    </div>
  );
}
function StTable({rows,acc,adv}){
  return(<div style={{background:"var(--sur)",border:`1px solid ${acc||"var(--bos)"}`,borderRadius:10,overflow:"hidden",padding:"2px 9px 8px"}}>
    <table className="sttbl"><thead><tr><th style={{textAlign:"left"}}>Equipo</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>GF</th><th>GC</th><th>DG</th><th>PTS</th></tr></thead>
    <tbody>{rows.map((t,i)=><tr key={t.n} className={adv&&i<2?"stadv":""}><td><span style={{marginRight:4}}>{t.f}</span><span style={{fontWeight:700,fontSize:11}}>{t.n}</span></td><td style={{opacity:.6}}>{t.pj}</td><td>{t.pg}</td><td>{t.pe}</td><td>{t.pp}</td><td>{t.gf}</td><td>{t.gc}</td><td style={{color:(t.gf-t.gc)>0?"var(--green)":(t.gf-t.gc)<0?"var(--red)":"var(--txs)"}}>{t.gf-t.gc>0?"+":""}{t.gf-t.gc}</td><td className="ptsc">{t.pts}</td></tr>)}</tbody></table>
    {adv&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:9,color:"var(--green)",letterSpacing:"2px",marginTop:5,opacity:.7}}>✦ LOS 2 PRIMEROS CLASIFICAN</div>}
  </div>);
}
function ScoreInfo(){return(<div className="sbox"><div className="stit" style={{marginTop:0,marginBottom:7}}>Puntos en juego</div>{[["✅ Resultado correcto","3 pts"],["🎯 Marcador exacto","5 pts"],["📊 Posición exacta por equipo","2 pts"],["🔢 Puntos exactos del equipo","1 pt"],["⭐ Grupo perfecto (todo exacto)","+10 BONUS"]].map(([l,p])=><div key={l} className="srow"><span style={{flex:1}}>{l}</span><span className="spts">{p}</span></div>)}</div>);}

// ═══ KNOCKOUT PANEL ═══════════════════════════════════════════════════
function KOPanel({rid,preds,koTeams,koResults,koUnlocked,onUpd}){
  const round=KO_ROUNDS.find(r=>r.id===rid),unl=koUnlocked?.[rid],defs=KO_DEFS.filter(d=>d.round===rid);
  if(!unl)return(<div>
    <div className="ko-hdr"><span style={{fontSize:32}}>{round.emoji}</span><div><div className="ko-tit" style={{color:"var(--blue)"}}>{round.label}</div><span className="badge badge-b">Próxima fase</span></div></div>
    <div className="ko-lk"><div style={{fontSize:32,marginBottom:8}}>🔒</div><div style={{fontFamily:"'Bebas Neue',cursive",fontSize:20,letterSpacing:"3px",marginBottom:8,color:"var(--txt)"}}>FASE NO DISPONIBLE AÚN</div><div style={{color:"var(--txs)",lineHeight:1.6,fontSize:13,fontFamily:"'Barlow Condensed',sans-serif"}}>El administrador habilitará {round.label.toLowerCase()} cuando estén definidos los clasificados.</div></div>
    <KOInfo/>
  </div>);
  return(<div style={{animation:"fi .3s ease"}}>
    <div className="ko-hdr"><span style={{fontSize:32}}>{round.emoji}</span><div><div className="ko-tit" style={{color:"var(--blue)"}}>{round.label}</div><span className="badge badge-gr">✓ Abierta para pronósticos</span></div></div>
    {defs.map(def=><KORow key={def.id} def={def} pred={preds?.ko?.[def.id]||{h:"",a:"",penWinner:null}} result={koResults?.[def.id]} teams={koTeams?.[def.id]} onU={(f,v)=>onUpd(def.id,f,v)}/>)}
    <KOInfo/>
  </div>);
}
function KOInfo(){return(<div className="sbox"><div className="stit" style={{marginTop:0,marginBottom:7}}>Puntos — eliminación directa</div>{[["✅ Ganador correcto","4 pts"],["🎯 Marcador exacto (reglamentario)","8 pts"],["🥊 Ganador por penales correcto","+3 pts"],["⭐ Ronda perfecta (todos los ganadores)","+5 BONUS"]].map(([l,p])=><div key={l} className="srow"><span style={{flex:1}}>{l}</span><span className="spts">{p}</span></div>)}</div>);}
function KORow({def,pred,result,teams,onU}){
  const h=teams?.h||def.ph,a=teams?.a||def.pa,noT=!teams?.h||!teams?.a;
  const isD=pred.h!==""&&pred.a!==""&&+pred.h===+pred.a;
  const pts=result&&result.h!==""&&pred.h!==""?sKO(pred,result):null;
  const isE=pts===8||pts===11,isO=pts===4||pts===7;
  let bc="var(--bos)";if(pts!==null)bc=isE?"rgba(240,180,41,.4)":isO?"rgba(16,185,129,.35)":"rgba(244,63,94,.35)";
  return(<>
    <div className="ko-mr" style={{borderColor:bc,opacity:noT?.5:1}}>
      <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:12,color:"var(--txs)",minWidth:17}}>{def.num}</div>
      <span className="tn" style={{color:noT?"var(--txs)":"var(--txt)"}}>{h}</span>
      <input className="si" type="number" min="0" max="20" value={pred.h} onChange={e=>!noT&&onU("h",e.target.value)} disabled={noT} placeholder="–"/>
      <span className="vs">VS</span>
      <input className="si" type="number" min="0" max="20" value={pred.a} onChange={e=>!noT&&onU("a",e.target.value)} disabled={noT} placeholder="–"/>
      <span className="tn r" style={{color:noT?"var(--txs)":"var(--txt)"}}>{a}</span>
      {result&&result.h!==""&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:42,marginLeft:3}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:9,color:"var(--txs)",letterSpacing:"1px"}}>REAL</div><div style={{fontFamily:"'Bebas Neue',cursive",fontSize:17}}>{result.h}:{result.a}</div>{result.penWinner&&<div style={{fontSize:9,color:"var(--gold)",fontFamily:"'Barlow Condensed',sans-serif"}}>P:{result.penWinner==="H"?teams?.h||def.ph:teams?.a||def.pa}</div>}</div>}
      {pts!==null&&<span style={{fontFamily:"'Bebas Neue',cursive",fontSize:18,minWidth:27,textAlign:"right",color:isE?"var(--gold)":isO?"var(--green)":"var(--red)"}}>+{pts}</span>}
    </div>
    {isD&&!noT&&<div className="ko-pen">
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--gold)",letterSpacing:"1px",flexShrink:0}}>🥊 Empate → Ganador por penales:</div>
      <button className={`kpb${pred.penWinner==="H"?" sel":""}`} onClick={()=>onU("penWinner",pred.penWinner==="H"?null:"H")}>{h}</button>
      <button className={`kpb${pred.penWinner==="A"?" sel":""}`} onClick={()=>onU("penWinner",pred.penWinner==="A"?null:"A")}>{a}</button>
      {result?.penWinner&&<span className={`badge ${pred.penWinner===result.penWinner?"badge-g":"badge-r"}`}>{pred.penWinner===result.penWinner?"✓ Correcto":"✗ Incorrecto"}</span>}
    </div>}
  </>);
}

// ═══ SPECIAL PICKS ════════════════════════════════════════════════════
function CountryPlayerPicker({value,onChange,disabled}){
  const [country,setCountry]=useState(()=>{
    if(!value) return "";
    const found=Object.entries(PLAYERS_BY_COUNTRY).find(([,pl])=>pl.some(p=>value.startsWith(p)));
    return found?found[0]:"";
  });
  const players=country?PLAYERS_BY_COUNTRY[country]||[]:[];
  const playerVal=value?value.split(" — ")[0]:"";
  const handleCountry=e=>{setCountry(e.target.value);onChange("");};
  const handlePlayer=e=>{onChange(e.target.value?`${e.target.value} — ${country}`:"");};
  return(
    <div style={{display:"flex",flexDirection:"column",gap:9}}>
      <div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"var(--txs)",marginBottom:5,opacity:.8}}>1. Selecciona la selección</div>
        <select className="spsel" value={country} disabled={disabled} onChange={handleCountry}>
          <option value="">— País / Selección —</option>
          {COUNTRIES_LIST.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {country&&<div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"var(--txs)",marginBottom:5,opacity:.8}}>2. Selecciona el jugador</div>
        <select className="spsel" value={playerVal} disabled={disabled} onChange={handlePlayer}>
          <option value="">— Jugador —</option>
          {players.map(p=><option key={p} value={p}>{p}</option>)}
        </select>
      </div>}
    </div>
  );
}

function SpecialPanel({preds,spRes,onUpd,locked}){
  return(<div style={{animation:"fi .3s ease"}}>
    <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:40,color:"var(--gold)",letterSpacing:"5px",marginBottom:7}}>Picks Especiales</div>
    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--txs)",marginBottom:16,lineHeight:1.5,maxWidth:460}}>Pronósticos que se hacen ANTES del mundial y se revelan al finalizar el torneo.</div>
    {[{id:"topScorer",icon:"👟",title:"Goleador del Torneo",pts:"15",desc:"¿Quién terminará como máximo anotador del Mundial 2026?"},{id:"goldenBall",icon:"⭐",title:"Balón de Oro",pts:"10",desc:"¿Quién ganará el premio al mejor jugador del torneo?"}].map(({id,icon,title,pts,desc})=>{
      const val=preds?.special?.[id],rv=spRes?.[id],ok=rv&&val===rv;
      return(<div key={id} className="sp-card" style={{borderColor:ok?"rgba(240,180,41,.5)":rv&&val!==rv?"rgba(244,63,94,.3)":"var(--gbor)"}}>
        <div className="sp-tit">{icon} {title}</div>
        <div style={{marginBottom:7}}><span className="sp-pts">🏆 {pts} puntos si aciertas</span></div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,color:"var(--txs)",marginBottom:12,lineHeight:1.4}}>{desc}</div>
        <CountryPlayerPicker value={val||""} onChange={v=>!locked&&onUpd(id,v||null)} disabled={!!locked}/>
        {val&&<div style={{marginTop:8,fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,color:"var(--gold)",opacity:.8}}>✓ Tu pick: <strong>{val}</strong></div>}
        {rv&&<div style={{marginTop:6}}><span className={`badge ${ok?"badge-g":"badge-r"}`}>{ok?`✓ ¡Correcto! — ${rv}`:`✗ Fue: ${rv}`}</span></div>}
      </div>);
    })}
  </div>);
}
// ═══ LEADERBOARD ══════════════════════════════════════════════════════
function LBView({lb,results,koUnlocked,users,allPreds,onBack}){
  const [tab,setTab]=useState("tabla");
  const hasKO=Object.values(koUnlocked||{}).some(Boolean);
  const rc=["rnkg","rnks","rnkb"],re=["🥇","🥈","🥉"];
  const haRes=Object.values(results?.matches||{}).some(r=>r.h!==""&&r.a!=="");
  return(<div style={{padding:"22px",maxWidth:900,margin:"0 auto"}}>
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,flexWrap:"wrap"}}>
      <button className="btn btn-ol btn-sm" onClick={onBack}>← Volver</button>
      <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:36,color:"var(--gold)",letterSpacing:"5px",lineHeight:1,flex:1}}>Polla Mundialista 2026</div>
    </div>
    <div className="atab" style={{marginBottom:18}}>
      {[["tabla","🏆 Tabla"],["apuestas","👁️ Ver Apuestas"],["stats","📈 Estadísticas"]].map(([k,l])=>(
        <button key={k} className={`atb${tab===k?" act":""}`} onClick={()=>setTab(k)}>{l}</button>
      ))}
    </div>

    {tab==="tabla"&&<>
      {haRes&&lb.length>=2&&<><div className="stit">El show de la polla</div><FunStats lb={lb}/></>}
      <div className="stit">Clasificación general</div>
      {lb.length===0&&<div style={{textAlign:"center",color:"var(--txs)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:17,marginTop:36}}>Nadie ha ingresado pronósticos aún. ¡Sé el primero! ⚽</div>}
      {lb.map((u,i)=>(
        <div key={u.id} className={`lbr${i===0?" first":""}`}>
          <span className={`rnk ${i<3?rc[i]:""}`}>{i<3?re[i]:`${i+1}°`}</span>
          <div style={{flex:1}}>
            <div className="lbn">{u.name}{u.equipoFav&&u.equipoFav!=="— Sin preferencia —"&&<span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--txs)",fontWeight:400,marginLeft:6}}>({u.equipoFav.split(" ")[0]})</span>}</div>
            <div className="lbsub">{u.ciudad&&<span>📍{u.ciudad}</span>}<span>⚽ {u.group||0}</span>{hasKO&&<span>⚔️ {u.knockout||0}</span>}<span>🌟 {u.special||0}</span></div>
          </div>
          <div className="lbp">{u.total}<span style={{fontSize:12,color:"var(--txs)"}}> pts</span></div>
        </div>
      ))}
    <div className="sbox" style={{marginTop:20}}>
      <div className="stit" style={{marginTop:0,marginBottom:8}}>Sistema de puntuación</div>
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,lineHeight:"1.8",color:"var(--txs)"}}>
        <div style={{color:"var(--green)",fontWeight:700,marginBottom:2,fontSize:10,letterSpacing:"2px"}}>FASE DE GRUPOS</div>
        {[["✅ Resultado correcto","3"],["🎯 Marcador exacto","5"],["📊 Posición exacta por equipo","2"],["🔢 Puntos exactos del equipo","1"],["⭐ Grupo perfecto","+10"]].map(([l,p])=><div key={l} className="srow" style={{padding:"1px 0"}}><span style={{flex:1}}>{l}</span><span className="spts" style={{fontSize:13}}>{p} pts</span></div>)}
        <div style={{color:"var(--blue)",fontWeight:700,margin:"7px 0 2px",fontSize:10,letterSpacing:"2px"}}>ELIMINACIÓN DIRECTA</div>
        {[["✅ Ganador correcto","4"],["🎯 Marcador exacto","8"],["🥊 Ganador por penales","+3"],["⭐ Ronda perfecta","+5"]].map(([l,p])=><div key={l} className="srow" style={{padding:"1px 0"}}><span style={{flex:1}}>{l}</span><span className="spts" style={{fontSize:13}}>{p} pts</span></div>)}
        <div style={{color:"var(--gold)",fontWeight:700,margin:"7px 0 2px",fontSize:10,letterSpacing:"2px"}}>PICKS ESPECIALES</div>
        {[["👟 Goleador del torneo","15"],["⭐ Balón de Oro","10"]].map(([l,p])=><div key={l} className="srow" style={{padding:"1px 0"}}><span style={{flex:1}}>{l}</span><span className="spts" style={{fontSize:13}}>{p} pts</span></div>)}
      </div>
    </div>
    </>}

    {tab==="apuestas"&&<ApuestasView users={users} allPreds={allPreds} results={results} lb={lb}/>}
    {tab==="stats"&&<StatsPanel users={users} lb={lb}/>}
  </div>);
}
// ═══ HOY VIEW — Partidos del día ══════════════════════════════════════
function HoyView({results,allPreds,users,lb,onBack}){
  // Fecha actual en formato "Jun 11" para comparar con SCHEDULE
  const now = new Date();
  const monthNames=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const todayStr = `${monthNames[now.getMonth()]} ${now.getDate()}`;

  // Simula una fecha específica para pruebas antes del mundial
  // Cuando el mundial arranque esto apunta a la fecha real
  const worldcupStart = new Date('2026-06-11');
  const isBeforeWC = now < worldcupStart;

  // Partidos de hoy: buscar en SCHEDULE los que coincidan con todayStr
  const todayMatches = Object.entries(SCHEDULE)
    .filter(([,v]) => v.d === todayStr)
    .map(([k,v]) => {
      // Find group and teams from the key
      const gk = k.split('|')[0];
      const teams = GROUPS[gk];
      // Find the match in the group
      const match = mkM(gk).find(m => m.id===k);
      return match ? {id:match.id, h:match.h, a:match.a, gk, sch:v} : null;
    })
    .filter(Boolean)
    .sort((a,b) => a.sch.h.localeCompare(b.sch.h));

  const [selMatch, setSelMatch] = useState(todayMatches[0]?.id || null);

  // Predictions for selected match
  const matchPreds = selMatch ? users.map(u => {
    const p = allPreds?.[u.id]?.matches?.[selMatch];
    const rp = results?.matches?.[selMatch];
    const hasResult = rp && rp.h !== "" && rp.a !== "";
    const pts = p && p.h !== "" && p.a !== "" && hasResult ? sMatch(p.h, p.a, rp.h, rp.a) : null;
    return {...u, pred:p, pts, rp, hasResult};
  }).filter(u => u.pred && u.pred.h !== "" && u.pred.a !== "") : [];

  const selData = todayMatches.find(m => m.id === selMatch);
  const rp = selMatch ? results?.matches?.[selMatch] : null;
  const hasResult = rp && rp.h !== "" && rp.a !== "";

  return(
    <div style={{padding:"22px",maxWidth:800,margin:"0 auto"}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6,flexWrap:"wrap"}}>
        <button className="btn btn-ol btn-sm" onClick={onBack}>← Volver</button>
        <div style={{flex:1}}>
          <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:36,color:"var(--gold)",letterSpacing:"5px",lineHeight:1}}>
            Partidos de Hoy
          </div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--txs)",marginTop:2,letterSpacing:"1px"}}>
            {now.toLocaleDateString('es-CO',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}
          </div>
        </div>
      </div>

      {/* Before WC or no matches today */}
      {isBeforeWC && (
        <div style={{background:"var(--sur)",border:"1px solid var(--gbor)",borderRadius:12,padding:"24px",textAlign:"center",marginTop:16}}>
          <div style={{fontSize:40,marginBottom:10}}>⏳</div>
          <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:24,color:"var(--gold)",letterSpacing:"3px",marginBottom:8}}>
            EL MUNDIAL ARRANCA EL 11 DE JUNIO
          </div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,color:"var(--txs)",lineHeight:1.6}}>
            Faltan <strong style={{color:"var(--txt)"}}>{Math.ceil((worldcupStart-now)/86400000)} días</strong> para el primer pitazo.<br/>
            ¡Aprovecha para llenar todos tus pronósticos antes de que cierre la polla!
          </div>
        </div>
      )}

      {!isBeforeWC && todayMatches.length === 0 && (
        <div style={{background:"var(--sur)",border:"1px solid var(--bos)",borderRadius:12,padding:"24px",textAlign:"center",marginTop:16}}>
          <div style={{fontSize:36,marginBottom:8}}>🌙</div>
          <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:22,color:"var(--txs)",letterSpacing:"3px",marginBottom:6}}>DÍA DE DESCANSO</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--txs)"}}>No hay partidos programados para hoy.</div>
        </div>
      )}

      {!isBeforeWC && todayMatches.length > 0 && (<>
        {/* Match selector */}
        <div style={{marginTop:14,marginBottom:16}}>
          <div className="stit" style={{marginTop:0}}>Partidos de hoy — selecciona para ver las apuestas</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {todayMatches.map(m=>{
              const mrp=results?.matches?.[m.id];
              const mHasResult=mrp&&mrp.h!==""&&mrp.a!=="";
              const isSelected=selMatch===m.id;
              const predCount=users.filter(u=>{const p=allPreds?.[u.id]?.matches?.[m.id];return p&&p.h!==""&&p.a!=="";}).length;
              return(
                <button key={m.id} onClick={()=>setSelMatch(m.id)}
                  style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",background:isSelected?"var(--gdim)":"var(--sur)",border:`1px solid ${isSelected?"var(--gold)":"var(--bos)"}`,borderRadius:10,cursor:"pointer",transition:"all .2s",textAlign:"left",width:"100%"}}>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:18,color:isSelected?"var(--gold)":"var(--txt)",letterSpacing:"2px"}}>
                      {m.h.f} {m.h.n} <span style={{opacity:.5,fontSize:14}}>VS</span> {m.a.n} {m.a.f}
                    </div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--txs)",marginTop:2}}>
                      🕐 {m.sch.h} COL · 🏟️ {m.sch.st} · <span style={{color:"var(--green)"}}>{predCount} apuesta{predCount!==1?"s":""}</span>
                    </div>
                  </div>
                  {mHasResult?(
                    <div style={{textAlign:"center"}}>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:9,color:"var(--gold)",letterSpacing:"2px"}}>FINAL</div>
                      <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:24,color:"var(--gold)",lineHeight:1}}>{mrp.h} — {mrp.a}</div>
                    </div>
                  ):(
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--txs)",opacity:.5,fontStyle:"italic",flexShrink:0}}>Por jugar</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Predictions for selected match */}
        {selData&&(
          <div style={{background:"var(--sur)",border:"1px solid var(--bos)",borderRadius:12,overflow:"hidden"}}>
            {/* Header */}
            <div style={{padding:"12px 16px",borderBottom:"1px solid var(--bos)",background:"rgba(240,180,41,.04)"}}>
              <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:22,color:"var(--gold)",letterSpacing:"3px"}}>
                👁️ Apuestas — {selData.h.f} {selData.h.n} vs {selData.a.n} {selData.a.f}
              </div>
              {hasResult&&(
                <div style={{marginTop:4,fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--txs)"}}>
                  Resultado real: <strong style={{color:"var(--gold)",fontFamily:"'Bebas Neue',cursive",fontSize:18}}>{rp.h} — {rp.a}</strong>
                </div>
              )}
            </div>

            {matchPreds.length===0?(
              <div style={{padding:"16px",color:"var(--txs)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,textAlign:"center"}}>
                Ningún participante ha ingresado pronóstico para este partido.
              </div>
            ):(
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"'Barlow Condensed',sans-serif"}}>
                  <thead>
                    <tr style={{borderBottom:"1px solid var(--bos)"}}>
                      <th style={{textAlign:"left",padding:"8px 16px",fontSize:10,letterSpacing:"2px",color:"var(--txs)",textTransform:"uppercase"}}>Participante</th>
                      <th style={{textAlign:"center",padding:"8px",fontSize:10,letterSpacing:"2px",color:"var(--txs)",textTransform:"uppercase"}}>Pronóstico</th>
                      <th style={{textAlign:"center",padding:"8px",fontSize:10,letterSpacing:"2px",color:"var(--txs)",textTransform:"uppercase"}}>Estado</th>
                      <th style={{textAlign:"center",padding:"8px 16px",fontSize:10,letterSpacing:"2px",color:"var(--txs)",textTransform:"uppercase"}}>Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchPreds.sort((a,b)=>(b.pts||0)-(a.pts||0)-(a.pts===null&&b.pts===null?0:0)).map((u,i)=>{
                      const isExact=u.pts===5,isOk=u.pts===3,isFail=u.pts===0&&u.hasResult;
                      const predSign=+u.pred.h>+u.pred.a?"Gana "+selData.h.n:+u.pred.a>+u.pred.h?"Gana "+selData.a.n:"Empate";
                      return(
                        <tr key={u.id} style={{borderBottom:"1px solid rgba(255,255,255,.03)",background:i%2===0?"transparent":"rgba(255,255,255,.015)"}}>
                          <td style={{padding:"10px 16px",fontSize:14,fontWeight:700,color:"var(--txt)"}}>
                            {i===0&&u.hasResult&&u.pts>0&&<span style={{marginRight:6}}>🏆</span>}{u.name}
                          </td>
                          <td style={{textAlign:"center",padding:"10px 8px"}}>
                            <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:22,color:isExact?"var(--gold)":isOk?"var(--green)":isFail?"var(--red)":"var(--txt)",lineHeight:1}}>
                              {u.pred.h} — {u.pred.a}
                            </div>
                            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:10,color:"var(--txs)",opacity:.7,marginTop:2}}>{predSign}</div>
                          </td>
                          <td style={{textAlign:"center",padding:"10px 8px"}}>
                            {isExact&&<span className="badge badge-g">🎯 Exacto</span>}
                            {isOk&&<span className="badge badge-gr">✅ Correcto</span>}
                            {isFail&&<span className="badge badge-r">✗ Falló</span>}
                            {!u.hasResult&&<span style={{color:"var(--txs)",fontSize:11,opacity:.6}}>En espera</span>}
                          </td>
                          <td style={{textAlign:"center",padding:"10px 16px"}}>
                            {u.pts!==null
                              ?<span style={{fontFamily:"'Bebas Neue',cursive",fontSize:22,color:isExact?"var(--gold)":isOk?"var(--green)":"var(--red)"}}>+{u.pts}</span>
                              :<span style={{color:"var(--txs)",fontSize:12}}>—</span>
                            }
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </>)}
    </div>
  );
}


// ═══ APUESTAS VIEW ════════════════════════════════════════════════════
function ApuestasView({users,allPreds,results,lb}){
  const [selGk,setSelGk]=useState("A");
  const lbMap={};lb.forEach(u=>lbMap[u.id]={total:u.total,group:u.group||0});

  // For selected group, show all matches and all users' predictions
  const matches=mkM(selGk);
  const rMatches=results?.matches||{};

  return(<div style={{animation:"fi .3s ease"}}>
    <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:26,color:"var(--gold)",letterSpacing:"4px",marginBottom:4}}>👁️ APUESTAS DE TODOS</div>
    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--txs)",marginBottom:14,lineHeight:1.5}}>
      Transparencia total — todos pueden ver los pronósticos de todos. Los resultados reales aparecen en dorado cuando el partido ya se jugó.
    </div>

    {/* Group selector */}
    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:16}}>
      {GKS.map(gk=>(
        <button key={gk} className={`atb${selGk===gk?" act":""}`} onClick={()=>setSelGk(gk)}>
          Grupo {gk}
        </button>
      ))}
    </div>

    {/* Group teams */}
    <div className="gts" style={{marginBottom:16}}>
      {GROUPS[selGk].map(t=><span key={t.n} className="tc">{t.f} {t.n}</span>)}
    </div>

    {/* Each match */}
    {matches.map(({id,h,a})=>{
      const rp=rMatches[id];
      const hasResult=rp&&rp.h!==""&&rp.a!=="";
      const sch=SCHEDULE[id];

      // Collect all predictions for this match
      const preds=users.map(u=>{
        const p=allPreds?.[u.id]?.matches?.[id];
        const pts=p&&p.h!==""&&p.a!==""&&hasResult?sMatch(p.h,p.a,rp.h,rp.a):null;
        return{...u,pred:p,pts};
      }).filter(u=>u.pred&&u.pred.h!==""&&u.pred.a!=="");

      return(
        <div key={id} style={{marginBottom:18,background:"var(--sur)",border:"1px solid var(--bos)",borderRadius:12,overflow:"hidden"}}>
          {/* Match header */}
          <div style={{padding:"10px 14px",borderBottom:"1px solid var(--bos)",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:18,letterSpacing:"2px",color:"var(--txt)"}}>{h.f} {h.n} <span style={{color:"var(--txs)",fontSize:14}}>VS</span> {a.n} {a.f}</div>
              {sch&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--txs)",marginTop:2}}>📅 {sch.d} · 🕐 {sch.h} COL · 🏟️ {sch.st}</div>}
            </div>
            {hasResult&&(
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:9,color:"var(--gold)",letterSpacing:"2px",marginBottom:2}}>RESULTADO REAL</div>
                <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:28,color:"var(--gold)",lineHeight:1}}>{rp.h} — {rp.a}</div>
              </div>
            )}
            {!hasResult&&(
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--txs)",opacity:.5,fontStyle:"italic"}}>Partido no jugado aún</div>
            )}
          </div>

          {/* Predictions table */}
          {preds.length===0?(
            <div style={{padding:"12px 14px",color:"var(--txs)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13}}>Ningún participante ha ingresado pronóstico para este partido.</div>
          ):(
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"'Barlow Condensed',sans-serif"}}>
                <thead>
                  <tr style={{borderBottom:"1px solid var(--bos)"}}>
                    <th style={{textAlign:"left",padding:"7px 14px",fontSize:10,letterSpacing:"2px",color:"var(--txs)",textTransform:"uppercase",minWidth:120}}>Participante</th>
                    <th style={{textAlign:"center",padding:"7px 10px",fontSize:10,letterSpacing:"2px",color:"var(--txs)",textTransform:"uppercase"}}>Pronóstico</th>
                    <th style={{textAlign:"center",padding:"7px 10px",fontSize:10,letterSpacing:"2px",color:"var(--txs)",textTransform:"uppercase"}}>Resultado</th>
                    <th style={{textAlign:"center",padding:"7px 10px",fontSize:10,letterSpacing:"2px",color:"var(--txs)",textTransform:"uppercase"}}>Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {preds.sort((a,b)=>(b.pts||0)-(a.pts||0)).map((u,i)=>{
                    const isExact=u.pts===5,isOk=u.pts===3,isFail=u.pts===0&&hasResult;
                    const predRes=u.pred.h>u.pred.a?"L":u.pred.a>u.pred.h?"V":"E";
                    return(
                      <tr key={u.id} style={{borderBottom:"1px solid rgba(255,255,255,.03)",background:i%2===0?"transparent":"rgba(255,255,255,.015)"}}>
                        <td style={{padding:"8px 14px",fontSize:14,fontWeight:700,color:"var(--txt)"}}>{u.name}</td>
                        <td style={{textAlign:"center",padding:"8px 10px"}}>
                          <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:20,color:isExact?"var(--gold)":isOk?"var(--green)":isFail?"var(--red)":"var(--txt)"}}>{u.pred.h} — {u.pred.a}</span>
                          <span style={{marginLeft:6,fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--txs)",opacity:.7}}>{predRes}</span>
                        </td>
                        <td style={{textAlign:"center",padding:"8px 10px"}}>
                          {isExact&&<span className="badge badge-g">🎯 Exacto</span>}
                          {isOk&&<span className="badge badge-gr">✅ Correcto</span>}
                          {isFail&&<span className="badge badge-r">✗ Fallo</span>}
                          {!hasResult&&<span style={{color:"var(--txs)",fontSize:11,fontFamily:"'Barlow Condensed',sans-serif"}}>—</span>}
                        </td>
                        <td style={{textAlign:"center",padding:"8px 10px"}}>
                          {u.pts!==null?(
                            <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:20,color:isExact?"var(--gold)":isOk?"var(--green)":"var(--red)"}}>+{u.pts}</span>
                          ):<span style={{color:"var(--txs)",fontSize:12}}>—</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    })}
  </div>);
}


function FunStats({lb}){
  if(lb.length<2)return null;
  const top=lb[0],bot=lb[lb.length-1],avg=Math.round(lb.reduce((s,u)=>s+u.total,0)/lb.length),gap=lb.length>=2?lb[0].total-lb[1].total:0;
  return(<div className="fsc">{[{e:"👑",t:"El Crack",v:top.name,s:`${top.total} pts — imparable`},{e:"🛋️",t:"El del Sillón",v:bot.name,s:`${bot.total} pts — ¿vio el partido?`},{e:"📊",t:"Promedio polla",v:`${avg} pts`,s:`${lb.length} polleros`},{e:"🔥",t:"Líder vs 2°",v:gap>0?`+${gap} pts`:"Empate",s:gap>0?`${top.name} escapa`:"Está apretado"}].map((s,i)=><div key={i} className="fss"><div className="fse">{s.e}</div><div className="fst">{s.t}</div><div className="fsv">{s.v}</div><div className="fss2">{s.s}</div></div>)}</div>);
}

// ═══ STATS PANEL ══════════════════════════════════════════════════════
function StatsPanel({users,lb}){
  const lbM={};lb.forEach(u=>lbM[u.id]=u.total);
  const grp=key=>{const r={};users.forEach(u=>{const k=u[key]||"No informado";if(!r[k])r[k]={t:0,c:0};r[k].t+=lbM[u.id]||0;r[k].c++;});return r;};
  const toR=obj=>Object.entries(obj).filter(([,v])=>v.c>0).map(([k,v])=>({k,avg:Math.round(v.t/v.c),count:v.c})).sort((a,b)=>b.avg-a.avg);
  const ao=["Menor de 18","18–25","26–35","36–45","46–55","Mayor de 55","No informado"];
  const bS=toR(grp("sexo")),bE=toR(grp("edad")).sort((a,b)=>ao.indexOf(a.k)-ao.indexOf(b.k));
  const bQ=toR(grp("equipoFav")).filter(r=>r.k!=="— Sin preferencia —").slice(0,6);
  const bC=toR(grp("ciudad")).slice(0,6);
  const all=[...bS,...bE,...bQ,...bC],mx=Math.max(...all.map(r=>r.avg),1);
  const cols=["#f0b429","#10b981","#60a5fa","#a78bfa","#f97316","#34d399"];
  const Card=({title,rows})=>(<div className="sc"><div className="sct">{title}</div>{rows.length===0?<div style={{color:"var(--txs)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:12}}>Sin datos suficientes</div>:rows.map((r,i)=>(<div key={r.k} className="brw"><div className="brl" title={r.k}>{r.k}</div><div className="brb"><div className="brf" style={{width:`${(r.avg/mx)*100}%`,background:cols[i%cols.length]}}/></div><div className="brv">{r.avg}</div><div className="brc">{r.count}p</div></div>))}</div>);
  return(<div style={{marginBottom:16}}>
    <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:22,color:"var(--blue)",letterSpacing:"4px",marginBottom:11}}>📈 ESTADÍSTICAS DEL GRUPO</div>
    {users.filter(u=>u.sexo||u.edad).length<2&&<div style={{color:"var(--txs)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,marginBottom:11}}>Las estadísticas aparecen cuando hay al menos 2 participantes con datos demográficos.</div>}
    <div className="sg">
      <Card title="👥 Promedio por sexo" rows={bS}/>
      <Card title="🎂 Promedio por edad" rows={bE}/>
      {bQ.length>0&&<Card title="⭐ Equipo favorito (promedio pts)" rows={bQ}/>}
      {bC.length>0&&<Card title="📍 Promedio por ciudad / país" rows={bC}/>}
    </div>
    <div style={{background:"var(--sur)",border:"1px solid var(--bos)",borderRadius:10,padding:"12px 14px"}}>
      <div className="sct" style={{marginBottom:8}}>Distribución de participantes</div>
      <div style={{display:"flex",gap:16,flexWrap:"wrap",fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,color:"var(--txs)"}}>
        <span>👥 Total: <strong style={{color:"var(--txt)"}}>{users.length}</strong></span>
        <span>📝 Con perfil: <strong style={{color:"var(--txt)"}}>{users.filter(u=>u.sexo||u.edad).length}</strong></span>
        <span>🌍 Con ciudad: <strong style={{color:"var(--txt)"}}>{users.filter(u=>u.ciudad).length}</strong></span>
        <span>⭐ Con equipo: <strong style={{color:"var(--txt)"}}>{users.filter(u=>u.equipoFav&&u.equipoFav!=="— Sin preferencia —").length}</strong></span>
      </div>
    </div>
  </div>);
}

// ═══ ADMIN VIEW ═══════════════════════════════════════════════════════
function AdminView({results,onSaveR,locked,onToggle,onBack,users,allPreds,lb,koTeams,onSaveKT,koResults,onSaveKR,koUnlocked,onSaveKU,spRes,onSaveSR,onDeleteUser,onSaveUsers}){
  const [auth,setAuth]=useState(false);
  const [pw,setPw]=useState("");
  const [tab,setTab]=useState("groups");
  const [aG,setAG]=useState("A");
  const [aK,setAK]=useState("r32");
  const [lr,setLr]=useState(results);
  const [lkt,setLkt]=useState(koTeams);
  const [lkr,setLkr]=useState(koResults);
  const [lku,setLku]=useState(koUnlocked);
  const [lsp,setLsp]=useState(spRes);
  const [saving,setSaving]=useState(false);
  const [saved,setSaved]=useState(false);
  const [editingUser,setEditingUser]=useState(null);
  const PASS="polla2026";

  if(!auth)return(<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:14}}>
    <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:38,color:"var(--gold)",letterSpacing:"5px"}}>Panel Admin</div>
    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--txs)",letterSpacing:"3px"}}>POLLA MUNDIALISTA 2026</div>
    <input type="password" className="ni" placeholder="Contraseña..." value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(pw===PASS?setAuth(true):alert("❌ Incorrecta"))} autoFocus/>
    <div style={{display:"flex",gap:9}}><button className="btn btn-ol btn-sm" onClick={onBack}>← Volver</button><button className="btn btn-gold" onClick={()=>pw===PASS?setAuth(true):alert("❌ Incorrecta")}>Entrar</button></div>
  </div>);

  const saveAll=async()=>{setSaving(true);await Promise.all([onSaveR(lr),onSaveKT(lkt),onSaveKR(lkr),onSaveKU(lku),onSaveSR(lsp)]);setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),2500);};
  const updR=(id,h,a)=>setLr(r=>({...r,matches:{...r.matches,[id]:{h,a}}}));
  const updRSt=(gk,pos,t)=>{const c=[...(lr?.standings?.[gk]||[null,null,null,null])];for(let i=0;i<4;i++)if(c[i]===t&&i!==pos)c[i]=null;c[pos]=t||null;setLr(r=>({...r,standings:{...r.standings,[gk]:c}}));};
  const updKT=(mid,s,v)=>setLkt(kt=>({...kt,[mid]:{...kt?.[mid],[s]:v}}));
  const updKR=(mid,f,v)=>setLkr(kr=>({...kr,[mid]:{...kr?.[mid],[f]:v}}));
  const togR=rid=>setLku(u=>({...u,[rid]:!u?.[rid]}));
  const live=cStand(aG,lr?.matches);

  return(<div style={{padding:20,maxWidth:980,margin:"0 auto"}}>
    <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:14,flexWrap:"wrap"}}>
      <button className="btn btn-ol btn-sm" onClick={onBack}>← Salir</button>
      <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:29,color:"var(--gold)",letterSpacing:"4px",flex:1}}>Admin ⚙️</div>
      <button className={`btn btn-sm ${locked?"btn-gr":"btn-rd"}`} onClick={onToggle}>{locked?"🔓 Abrir polla":"🔒 Cerrar polla"}</button>
      <button className={`btn btn-sm ${saved?"btn-gr":"btn-gold"}`} onClick={saveAll} disabled={saving}>{saving?"Guardando...":saved?"✅ Guardado":"💾 Guardar todo"}</button>
    </div>
    <div className="atab">{[["groups","⚽ Grupos"],["knockout","⚔️ Eliminación"],["special","🌟 Especiales"],["users","👥 Usuarios"],["stats","📈 Estadísticas"],["lb","📊 Tabla"]].map(([k,l])=><button key={k} className={`atb${tab===k?" act":""}`} onClick={()=>setTab(k)}>{l}</button>)}</div>

    {tab==="groups"&&(<>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:11}}>{GKS.map(gk=><button key={gk} className={`atb${aG===gk?" act":""}`} onClick={()=>setAG(gk)}>Grupo {gk}</button>)}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"start"}}>
        <div>
          <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:27,color:"var(--gold)",letterSpacing:"4px",marginBottom:8}}>GRUPO {aG}</div>
          {mkM(aG).map(({id,h,a})=>{const r=lr?.matches?.[id]||{h:"",a:""};return(<div key={id} className="mr"><span className="tn">{h.f} {h.n}</span><input className="si" type="number" min="0" max="20" value={r.h||""} onChange={e=>updR(id,e.target.value,r.a||"")} placeholder="–"/><span className="vs">–</span><input className="si" type="number" min="0" max="20" value={r.a||""} onChange={e=>updR(id,r.h||"",e.target.value)} placeholder="–"/><span className="tn r">{a.n} {a.f}</span></div>);})}
          <div className="stit" style={{marginTop:14}}>Clasificación real</div>
          {[0,1,2,3].map(i=>{const med=["🥇","🥈","🥉","4️⃣"],st=lr?.standings?.[aG]||[null,null,null,null];return(<div key={i} className="sr"><span className="pos">{med[i]}</span><select className="tsel" value={st[i]||""} onChange={e=>updRSt(aG,i,e.target.value||null)}><option value="">— Seleccionar —</option>{GROUPS[aG].map(t=><option key={t.n} value={t.n} disabled={st.includes(t.n)&&st[i]!==t.n}>{t.f} {t.n}</option>)}</select></div>);})}
        </div>
        <div>
          <div className="stit" style={{marginTop:0,color:"var(--gold)"}}>🏆 Tabla en tiempo real</div>
          {live.some(s=>s.pj>0)?<StTable rows={live} acc="rgba(240,180,41,.3)" adv/>:<div style={{color:"var(--txs)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13}}>Cargá resultados para ver la tabla.</div>}
        </div>
      </div>
    </>)}

    {tab==="knockout"&&(<>
      <div style={{marginBottom:11}}>
        <div className="stit">Activar / desactivar fases</div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{KO_ROUNDS.map(r=><button key={r.id} className={`btn btn-sm ${lku?.[r.id]?"btn-gr":"btn-ol"}`} onClick={()=>togR(r.id)}>{lku?.[r.id]?"✓ ":""}{r.emoji} {r.short}</button>)}</div>
      </div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:11}}>{KO_ROUNDS.map(r=><button key={r.id} className={`atb${aK===r.id?" act":""}`} onClick={()=>setAK(r.id)}>{r.emoji} {r.short}</button>)}</div>
      {KO_DEFS.filter(d=>d.round===aK).map(def=>{
        const teams=lkt?.[def.id]||{h:"",a:""},res=lkr?.[def.id]||{h:"",a:"",penWinner:null},isD=res.h!==""&&res.a!==""&&+res.h===+res.a;
        return(<div key={def.id} style={{background:"var(--sur)",border:"1px solid var(--bos)",borderRadius:10,padding:"11px 13px",marginBottom:8}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:10,color:"var(--txs)",letterSpacing:"2px",marginBottom:7}}>PARTIDO {def.num} — {def.ph} vs {def.pa}</div>
          <div style={{display:"flex",gap:7,marginBottom:7,flexWrap:"wrap"}}>
            <select className="ti" style={{flex:1}} value={teams.h||""} onChange={e=>updKT(def.id,"h",e.target.value)}><option value="">— Local ({def.ph}) —</option>{ALL_TEAMS.map(t=><option key={t} value={t}>{t}</option>)}</select>
            <select className="ti" style={{flex:1}} value={teams.a||""} onChange={e=>updKT(def.id,"a",e.target.value)}><option value="">— Visitante ({def.pa}) —</option>{ALL_TEAMS.map(t=><option key={t} value={t}>{t}</option>)}</select>
          </div>
          <div style={{display:"flex",gap:7,alignItems:"center",flexWrap:"wrap"}}>
            <input className="si" type="number" min="0" max="20" value={res.h||""} onChange={e=>updKR(def.id,"h",e.target.value)} placeholder="G"/>
            <span style={{fontFamily:"'Bebas Neue',cursive",color:"var(--txs)"}}>–</span>
            <input className="si" type="number" min="0" max="20" value={res.a||""} onChange={e=>updKR(def.id,"a",e.target.value)} placeholder="G"/>
            {isD&&<><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--gold)"}}>Penales:</span><button className={`kpb${res.penWinner==="H"?" sel":""}`} onClick={()=>updKR(def.id,"penWinner",res.penWinner==="H"?null:"H")}>{teams.h||"Local"}</button><button className={`kpb${res.penWinner==="A"?" sel":""}`} onClick={()=>updKR(def.id,"penWinner",res.penWinner==="A"?null:"A")}>{teams.a||"Visit."}</button></>}
          </div>
        </div>);
      })}
    </>)}

    {tab==="special"&&(<div>
      <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:24,color:"var(--gold)",letterSpacing:"3px",marginBottom:11}}>Resultados Especiales</div>
      {[{id:"topScorer",icon:"👟",label:"Goleador del Torneo"},{id:"goldenBall",icon:"⭐",label:"Balón de Oro — Mejor Jugador"}].map(({id,icon,label})=>(
        <div key={id} style={{marginBottom:11}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:10,color:"var(--txs)",letterSpacing:"2px",marginBottom:5}}>{icon} {label.toUpperCase()}</div>
          <select className="spsel" value={lsp?.[id]||""} onChange={e=>setLsp(s=>({...s,[id]:e.target.value||null}))}><option value="">— No definido aún —</option>{PLAYERS.map(p=><option key={p} value={p}>{p}</option>)}</select>
        </div>
      ))}
    </div>)}

    {tab==="users"&&(<>
      <div className="stit">{users.length} participante{users.length!==1?"s":""} en la polla</div>
      {users.map(u=>{
        const done=GKS.filter(gk=>mkM(gk).every(({id})=>{const p=allPreds?.[u.id]?.matches?.[id];return p&&p.h!==""&&p.a!=="";})&&mkM(gk).length===6).length;
        return(
          <div key={u.id} className="lbr" style={{gap:8,flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:180}}>
              <div className="lbn">{u.name}</div>
              <div className="lbsub">
                {u.sexo&&<span>{u.sexo}</span>}
                {u.edad&&<span>{u.edad}</span>}
                {u.equipoFav&&u.equipoFav!=="— Sin preferencia —"&&<span>⭐{u.equipoFav.split(" ").slice(0,2).join(" ")}</span>}
                {u.ciudad&&<span>📍{u.ciudad}</span>}
                {!u.sexo&&!u.edad&&!u.ciudad&&<span style={{opacity:.4,fontStyle:"italic"}}>Sin perfil</span>}
              </div>
            </div>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",color:"var(--txs)",fontSize:12,flexShrink:0}}>{done}/12 grupos</span>
            <button
              onClick={()=>setEditingUser(u)}
              style={{padding:"4px 10px",border:"1px solid rgba(96,165,250,.3)",borderRadius:6,background:"transparent",color:"var(--blue)",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,fontWeight:700,flexShrink:0}}>
              ✏️ Editar
            </button>
            <button
              onClick={()=>{if(window.confirm(`¿Eliminar a "${u.name}" y todos sus pronósticos?`)){onDeleteUser(u.id);}}}
              style={{padding:"4px 10px",border:"1px solid rgba(244,63,94,.3)",borderRadius:6,background:"transparent",color:"#fca5a5",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,fontWeight:700,flexShrink:0}}>
              🗑️ Eliminar
            </button>
          </div>
        );
      })}
      {/* Edit user modal */}
      {editingUser&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"var(--su2)",border:"1px solid var(--gbor)",borderRadius:14,padding:"22px 24px",width:"100%",maxWidth:400,boxShadow:"0 24px 60px rgba(0,0,0,.5)"}}>
            <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:24,color:"var(--gold)",letterSpacing:"4px",marginBottom:14}}>✏️ EDITAR PERFIL</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--txs)",marginBottom:16}}>
              Editando a: <strong style={{color:"var(--txt)"}}>{editingUser.name}</strong>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {/* Nombre */}
              <div>
                <div className="dl">Nombre / Apodo</div>
                <input className="ni" style={{width:"100%",textAlign:"left",fontSize:14,padding:"8px 12px"}}
                  value={editingUser.name}
                  onChange={e=>setEditingUser(u=>({...u,name:e.target.value}))}/>
              </div>
              {/* Sexo */}
              <div>
                <div className="dl">Sexo</div>
                <select className="ds" value={editingUser.sexo||""} onChange={e=>setEditingUser(u=>({...u,sexo:e.target.value}))}>
                  {["","Hombre","Mujer"].map(o=><option key={o} value={o}>{o||"— Seleccionar —"}</option>)}
                </select>
              </div>
              {/* Edad */}
              <div>
                <div className="dl">Rango de edad</div>
                <select className="ds" value={editingUser.edad||""} onChange={e=>setEditingUser(u=>({...u,edad:e.target.value}))}>
                  {["","Menor de 18","18–25","26–35","36–45","46–55","Mayor de 55"].map(o=><option key={o} value={o}>{o||"— Seleccionar —"}</option>)}
                </select>
              </div>
              {/* Equipo favorito */}
              <div>
                <div className="dl">Equipo favorito</div>
                <select className="ds" value={editingUser.equipoFav||""} onChange={e=>setEditingUser(u=>({...u,equipoFav:e.target.value}))}>
                  {["","— Sin preferencia —",...ALL_TEAMS].map(o=><option key={o} value={o}>{o||"— Seleccionar —"}</option>)}
                </select>
              </div>
              {/* Ciudad */}
              <div>
                <div className="dl">Ciudad / País de nacimiento</div>
                <CityAutocomplete value={editingUser.ciudad||""} onChange={v=>setEditingUser(u=>({...u,ciudad:v}))}/>
              </div>
            </div>
            <div style={{display:"flex",gap:9,marginTop:18,justifyContent:"flex-end"}}>
              <button className="btn btn-ol btn-sm" onClick={()=>setEditingUser(null)}>Cancelar</button>
              <button className="btn btn-gold btn-sm" onClick={async()=>{
                const nu=users.map(x=>x.id===editingUser.id?editingUser:x);
                await onSaveUsers(nu);
                setSaved(true);
                setTimeout(()=>setSaved(false),1500);
                setEditingUser(null);
              }}>💾 Guardar cambios</button>
            </div>
          </div>
        </div>
      )}
    </>)}
    {tab==="stats"&&<StatsPanel users={users} lb={lb}/>}
    {tab==="lb"&&(<>
      <div className="stit">Tabla en tiempo real</div>
      {lb.map((u,i)=><div key={u.id} className={`lbr${i===0?" first":""}`}><span className={`rnk ${i===0?"rnkg":i===1?"rnks":i===2?"rnkb":""}`}>{i+1}°</span><div style={{flex:1}}><div className="lbn">{u.name}</div><div className="lbsub"><span>Grupos:{u.group||0}</span><span>KO:{u.knockout||0}</span><span>Esp:{u.special||0}</span></div></div><div className="lbp">{u.total}<span style={{fontSize:12,color:"var(--txs)"}}> pts</span></div></div>)}
    </>)}
  </div>);
}
