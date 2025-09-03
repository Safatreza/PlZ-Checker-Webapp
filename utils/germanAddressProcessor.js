/**
 * Comprehensive German Address Processing System
 * Handles ALL German cities, towns, villages, and districts across 16 federal states
 */

// Comprehensive German Cities Database with PLZ Ranges
// Organized by federal states (Bundesländer) for complete coverage
export const COMPREHENSIVE_GERMAN_CITIES = {
  // Baden-Württemberg (PLZ 6-7)
  'stuttgart': ['70173', '70174', '70176', '70178', '70180', '70182', '70184', '70186', '70188', '70190', '70191', '70192', '70193', '70195', '70197', '70199'],
  'mannheim': ['68159', '68161', '68163', '68165', '68167', '68169', '68199', '68219', '68229', '68239', '68259', '68305', '68307', '68309'],
  'karlsruhe': ['76133', '76135', '76137', '76139', '76185', '76187', '76189', '76199', '76227', '76228', '76229'],
  'freiburg': ['79098', '79100', '79102', '79104', '79106', '79108', '79110', '79111', '79112', '79114', '79115', '79117'],
  'heidelberg': ['69115', '69117', '69118', '69120', '69121', '69123', '69124', '69126', '69190', '69226'],
  'ulm': ['89073', '89075', '89077', '89079', '89081', '89129'],
  'heilbronn': ['74072', '74074', '74076', '74078'],
  'pforzheim': ['75172', '75173', '75175', '75177', '75179', '75181'],
  'reutlingen': ['72764', '72766', '72770', '72072', '72074', '72076'],
  'tübingen': ['72070', '72072', '72074', '72076'],
  'konstanz': ['78462', '78464', '78465', '78467'],
  'aalen': ['73430', '73431', '73432', '73433', '73434', '73435'],
  'sindelfingen': ['71063', '71065', '71067', '71069'],
  'schwäbisch gmünd': ['73525', '73527', '73529'],
  'baden-baden': ['76530', '76532', '76534'],
  'lörrach': ['79539', '79540', '79541'],
  'ravensburg': ['88212', '88213', '88214'],
  'villingen-schwenningen': ['78048', '78050', '78052', '78054', '78056'],
  'göppingen': ['73033', '73035', '73037'],
  'freudenstadt': ['72250'],
  'bad kissingen': ['97688'],
  'rothenburg ob der tauber': ['91541'],
  'münsingen': ['72525'],

  // Bayern (PLZ 8-9)
  'münchen': ['80331', '80333', '80335', '80337', '80339', '80469', '80538', '80636', '80687', '80689', '80796', '80797', '80798', '80799', '81241', '81243', '81245', '81247', '81249', '81369', '81371', '81373', '81375', '81377', '81379', '81475', '81476', '81477', '81479', '81539', '81541', '81543', '81545', '81547', '81549', '81667', '81669', '81671', '81673', '81675', '81677', '81679', '81735', '81737', '81739', '81825', '81827', '81829', '81925', '81927', '81929'],
  'nürnberg': ['90402', '90403', '90408', '90409', '90411', '90419', '90427', '90429', '90431', '90439', '90441', '90443', '90449', '90451', '90453', '90455', '90459', '90461', '90469', '90471', '90473', '90478', '90480', '90482', '90489', '90491', '90513', '90515', '90518', '90522', '90559', '90574', '90587', '90596'],
  'augsburg': ['86150', '86152', '86154', '86156', '86157', '86159', '86161', '86163', '86165', '86167', '86169', '86179', '86199'],
  'würzburg': ['97070', '97072', '97074', '97076', '97078', '97080', '97082', '97084'],
  'regensburg': ['93047', '93049', '93051', '93053', '93055', '93057', '93059'],
  'ingolstadt': ['85049', '85051', '85053', '85055', '85057'],
  'fürth': ['90762', '90763', '90765', '90766', '90768'],
  'erlangen': ['91052', '91054', '91056', '91058'],
  'bayreuth': ['95444', '95445', '95447', '95448'],
  'bamberg': ['96047', '96049', '96050', '96052'],
  'aschaffenburg': ['63739', '63741', '63743'],
  'landshut': ['84028', '84030', '84032', '84034', '84036'],
  'kempten': ['87435', '87437', '87439'],
  'rosenheim': ['83022', '83024', '83026'],
  'neu-ulm': ['89231', '89233'],
  'schweinfurt': ['97421', '97422', '97424', '97427'],
  'passau': ['94032', '94034', '94036'],
  'straubing': ['94315', '94327'],
  'freising': ['85354', '85356'],
  'coburg': ['96450', '96450'],
  'hof': ['95028', '95030', '95032'],
  'garmisch-partenkirchen': ['82467'],

  // Berlin (PLZ 1)
  'berlin': ['10115', '10117', '10119', '10178', '10179', '10243', '10245', '10247', '10249', '10317', '10318', '10319', '10365', '10367', '10369', '10405', '10407', '10409', '10435', '10437', '10439', '10551', '10553', '10555', '10557', '10559', '10585', '10587', '10589', '10623', '10625', '10627', '10629', '10707', '10709', '10711', '10713', '10715', '10717', '10719', '10777', '10779', '10781', '10783', '10785', '10787', '10789', '10823', '10825', '10827', '10829', '10961', '10963', '10965', '10967', '10969', '10997', '10999', '12043', '12045', '12047', '12049', '12051', '12053', '12055', '12057', '12059', '12099', '12101', '12103', '12105', '12107', '12109', '12157', '12159', '12161', '12163', '12165', '12167', '12169', '12203', '12205', '12207', '12209', '12247', '12249', '12277', '12279', '12305', '12307', '12309', '12351', '12353', '12355', '12357', '12359', '12435', '12437', '12439', '12487', '12489', '12524', '12526', '12527', '12555', '12557', '12559', '12587', '12589', '12623', '12627', '12629', '12679', '12681', '12683', '12685', '12687', '12689', '13051', '13053', '13055', '13057', '13059', '13086', '13088', '13089', '13125', '13127', '13129', '13156', '13158', '13159', '13187', '13189', '13347', '13349', '13351', '13353', '13355', '13357', '13359', '13403', '13405', '13407', '13409', '13435', '13437', '13439', '13465', '13467', '13469', '13503', '13505', '13507', '13509', '13581', '13583', '13585', '13587', '13589', '13591', '13593', '13595', '13597', '13599', '13627', '13629', '14050', '14052', '14053', '14055', '14057', '14059', '14109', '14129', '14163', '14165', '14167', '14169', '14193', '14195', '14197', '14199'],

  // Brandenburg (PLZ 1)
  'potsdam': ['14467', '14469', '14471', '14473', '14476', '14478', '14480', '14482'],
  'cottbus': ['03042', '03044', '03046', '03048', '03050', '03051'],
  'brandenburg': ['14770', '14772', '14774', '14776'],
  'frankfurt oder': ['15230', '15232', '15234', '15236'],
  'oranienburg': ['16515', '16540'],
  'falkensee': ['14612'],
  'königs wusterhausen': ['15711', '15713'],
  'strausberg': ['15344'],
  'eberswalde': ['16225', '16227'],
  'schwedt': ['16303'],

  // Bremen (PLZ 2)
  'bremen': ['28195', '28199', '28203', '28205', '28207', '28209', '28211', '28213', '28215', '28217', '28219', '28237', '28259', '28277', '28279', '28307', '28309', '28325', '28327', '28329', '28334', '28355', '28357', '28359', '28361', '28719', '28755', '28757', '28759'],
  'bremerhaven': ['27568', '27570', '27572', '27574', '27576', '27578'],

  // Hamburg (PLZ 2)
  'hamburg': ['20095', '20097', '20099', '20144', '20146', '20148', '20149', '20253', '20255', '20257', '20259', '20354', '20355', '20357', '20359', '20457', '20459', '20535', '20537', '20539', '21073', '21075', '21077', '21079', '21107', '21109', '21129', '21131', '21149', '21217', '21218', '21220', '21224', '21244', '21246', '21255', '21256', '21258', '21279', '21335', '21337', '21339', '21357', '21365', '21382', '21385', '21391', '21394', '21395', '21407', '21409', '21423', '21435', '21465', '21481', '21483', '21502', '21521', '21522', '21524', '21529', '21614', '21635', '21680', '22041', '22043', '22045', '22047', '22049', '22081', '22083', '22085', '22087', '22089', '22111', '22113', '22115', '22117', '22119', '22143', '22145', '22147', '22149', '22159', '22161', '22175', '22177', '22179', '22297', '22299', '22301', '22303', '22305', '22307', '22309', '22335', '22337', '22339', '22359', '22361', '22393', '22395', '22397', '22399', '22415', '22417', '22419', '22453', '22455', '22457', '22459', '22523', '22525', '22527', '22529', '22547', '22549', '22559', '22587', '22589', '22605', '22607', '22609', '22761', '22763', '22765', '22767', '22769', '22880', '22927', '22929'],

  // Hessen (PLZ 6)
  'frankfurt': ['60306', '60308', '60311', '60313', '60314', '60316', '60318', '60320', '60322', '60325', '60326', '60327', '60329', '60385', '60386', '60388', '60389', '60431', '60433', '60435', '60437', '60439', '60486', '60487', '60488', '60489', '60528', '60529', '60594', '60596', '60598', '60599'],
  'wiesbaden': ['65183', '65185', '65187', '65189', '65191', '65193', '65195', '65197', '65199', '65201', '65203', '65205', '65207'],
  'kassel': ['34117', '34119', '34121', '34123', '34125', '34127', '34128', '34130', '34131', '34132'],
  'darmstadt': ['64283', '64285', '64287', '64289', '64291', '64293', '64295', '64297'],
  'offenbach': ['63065', '63067', '63069', '63071', '63073', '63075', '63077', '63179'],
  'hanau': ['63450', '63452', '63454', '63456', '63457'],
  'marburg': ['35037', '35039', '35041', '35043'],
  'gießen': ['35390', '35392', '35394', '35396', '35398'],
  'fulda': ['36037', '36039', '36041', '36043'],
  'rüsselsheim': ['65428', '65429'],
  'bad homburg': ['61348', '61350'],
  'oberursel': ['61440', '61462'],
  'rodgau': ['63110'],
  'dreieich': ['63303'],
  'langen': ['63225'],
  'limburg': ['65549'],
  'wetzlar': ['35576', '35578'],

  // Mecklenburg-Vorpommern (PLZ 1-2)
  'rostock': ['18055', '18057', '18059', '18069', '18106', '18107', '18109', '18119', '18146', '18147'],
  'schwerin': ['19053', '19055', '19057', '19059', '19061', '19063'],
  'neubrandenburg': ['17033', '17034', '17035', '17036'],
  'stralsund': ['18435', '18437', '18439'],
  'greifswald': ['17489', '17491', '17493'],
  'wismar': ['23966', '23968', '23970'],
  'güstrow': ['18273'],
  'waren': ['17192'],
  'parchim': ['19370'],

  // Niedersachsen (PLZ 2-3)
  'hannover': ['30159', '30161', '30163', '30165', '30167', '30169', '30171', '30173', '30175', '30177', '30179', '30419', '30449', '30451', '30453', '30455', '30457', '30459', '30519', '30521', '30539', '30559', '30625', '30627', '30629', '30655', '30657', '30659', '30669', '30823', '30827', '30851', '30853', '30855', '30880', '30890', '30900', '30916', '30918', '30952', '30966'],
  'braunschweig': ['38100', '38102', '38104', '38106', '38108', '38110', '38112', '38114', '38116', '38118', '38120', '38122', '38124', '38126'],
  'oldenburg': ['26121', '26122', '26123', '26124', '26125', '26129', '26131', '26133'],
  'osnabrück': ['49074', '49076', '49078', '49080', '49082', '49084', '49086', '49088', '49090'],
  'wolfsburg': ['38440', '38442', '38444', '38446', '38448'],
  'göttingen': ['37073', '37075', '37077', '37079', '37081', '37083', '37085'],
  'salzgitter': ['38226', '38228', '38229', '38259', '38268'],
  'hildesheim': ['31134', '31135', '31137', '31139'],
  'delmenhorst': ['27749', '27751', '27753'],
  'wilhelmshaven': ['26382', '26384', '26386', '26388', '26389'],
  'lüneburg': ['21335', '21337', '21339'],
  'celle': ['29221', '29223', '29225'],
  'garbsen': ['30823', '30827'],
  'hameln': ['31785', '31787', '31789'],
  'lingen': ['49808', '49809'],
  'langenhagen': ['30851', '30853'],
  'nordhorn': ['48529', '48531'],
  'wolfenbüttel': ['38300', '38302'],
  'goslar': ['38640', '38642'],
  'peine': ['31224', '31226'],
  'emden': ['26721', '26723', '26725'],
  'cuxhaven': ['27472', '27474'],
  'stade': ['21682', '21684'],
  'verden': ['27283'],
  'buchholz': ['21244'],
  'neu wulmstorf': ['21629'],
  'seevetal': ['21218'],
  'isernhagen': ['30916'],
  'laatzen': ['30880'],
  'burgdorf': ['31303'],
  'springe': ['31832'],
  'weyhe': ['28844'],
  'stuhr': ['28816'],
  'ganderkesee': ['27777'],
  'rastede': ['26180'],
  'bad zwischenahn': ['26160'],
  'westerstede': ['26655'],
  'varel': ['26316'],
  'friesoythe': ['26169'],
  'cloppenburg': ['49661'],
  'vechta': ['49377'],
  'damme': ['49401'],
  'diepholz': ['49356'],
  'syke': ['28857'],
  'achim': ['28832'],
  'osterholz-scharmbeck': ['27711'],
  'rotenburg': ['27356'],
  'zeven': ['27404'],
  'bremervörde': ['27432'],
  'buxtehude': ['21614'],
  'winsen': ['21423'],
  'lüchow': ['29439'],
  'dannenberg': ['29451'],
  'uelzen': ['29525'],
  'soltau': ['29614'],
  'walsrode': ['29664'],
  'nienburg': ['31582'],
  'stadthagen': ['31655'],
  'bückeburg': ['31675'],
  'rinteln': ['31737'],
  'holzminden': ['37603'],
  'einbeck': ['37574'],
  'northeim': ['37154'],
  'osterode': ['37520'],
  'seesen': ['38723'],
  'herzberg': ['37412'],
  'duderstadt': ['37115'],
  'hann münden': ['34346'],
  'uslar': ['37170'],

  // Nordrhein-Westfalen (PLZ 4-5)
  'köln': ['50667', '50668', '50670', '50672', '50674', '50676', '50677', '50678', '50679', '50733', '50735', '50737', '50739', '50823', '50825', '50827', '50829', '50859', '50931', '50933', '50935', '50937', '50939', '50968', '50969', '50996', '50997', '50999', '51061', '51063', '51065', '51067', '51069', '51103', '51105', '51107', '51109', '51143', '51145', '51147', '51149'],
  'düsseldorf': ['40210', '40211', '40212', '40213', '40215', '40217', '40219', '40221', '40223', '40225', '40227', '40229', '40233', '40235', '40237', '40239', '40468', '40470', '40472', '40474', '40476', '40477', '40479', '40489', '40545', '40547', '40549', '40591', '40593', '40595', '40597', '40599', '40625', '40627', '40629', '40699'],
  'dortmund': ['44135', '44137', '44139', '44141', '44143', '44145', '44147', '44149', '44225', '44227', '44263', '44265', '44267', '44269', '44287', '44289', '44309', '44319', '44328', '44339', '44357', '44369', '44379', '44388', '44532', '44534', '44536', '44575', '44577', '44579', '44581', '44623', '44625', '44627', '44629', '44649', '44651', '44653', '44655', '44657', '44659', '44661', '44663', '44665', '44667', '44687', '44689', '44691', '44693', '44795', '44797', '44799', '44801', '44803', '44805', '44807', '44809'],
  'essen': ['45127', '45129', '45131', '45133', '45134', '45136', '45138', '45141', '45143', '45145', '45147', '45149', '45219', '45221', '45223', '45225', '45227', '45239', '45257', '45259', '45276', '45277', '45279', '45307', '45309', '45326', '45327', '45329', '45355', '45357', '45359', '45472', '45473', '45475', '45481', '45525', '45527', '45529', '45549', '45657', '45659', '45661', '45663', '45665', '45699'],
  'duisburg': ['47051', '47053', '47055', '47057', '47058', '47059', '47137', '47139', '47166', '47167', '47169', '47179', '47198', '47199', '47228', '47229', '47249', '47259', '47279', '47495'],
  'bochum': ['44787', '44789', '44791', '44793', '44795', '44797', '44799', '44801', '44803', '44805', '44807', '44809', '44866', '44867', '44869', '44879'],
  'wuppertal': ['42103', '42105', '42107', '42109', '42111', '42113', '42115', '42117', '42119', '42277', '42279', '42281', '42283', '42285', '42287', '42289', '42329', '42349', '42369', '42389', '42399'],
  'bielefeld': ['33602', '33604', '33605', '33607', '33609', '33611', '33613', '33615', '33617', '33619', '33647', '33649', '33659', '33689', '33699', '33719', '33729', '33739'],
  'bonn': ['53111', '53113', '53115', '53117', '53119', '53121', '53123', '53125', '53127', '53129', '53173', '53175', '53177', '53179', '53225', '53227', '53229'],
  'münster': ['48143', '48145', '48147', '48149', '48151', '48153', '48155', '48157', '48159', '48161', '48163', '48165', '48167'],
  'mönchengladbach': ['41061', '41063', '41065', '41066', '41068', '41169', '41179', '41189', '41199', '41236', '41238', '41239'],
  'gelsenkirchen': ['45879', '45881', '45883', '45884', '45886', '45888', '45892', '45894', '45896', '45898'],
  'aachen': ['52062', '52064', '52066', '52068', '52070', '52072', '52074', '52076', '52078', '52080'],
  'krefeld': ['47798', '47799', '47800', '47802', '47803', '47804', '47805', '47807', '47809', '47829', '47839', '47877', '47918'],
  'hagen': ['58089', '58091', '58093', '58095', '58097', '58099', '58119', '58135'],
  'hamm': ['59063', '59065', '59067', '59069', '59071', '59073', '59075'],
  'herne': ['44623', '44625', '44627', '44628', '44629'],
  'mülheim': ['45468', '45470', '45472', '45473', '45475', '45476', '45478', '45479', '45481'],
  'solingen': ['42651', '42653', '42655', '42657', '42659', '42697', '42699', '42719'],
  'leverkusen': ['51373', '51375', '51377', '51379', '51381', '51385', '51399'],
  'neuss': ['41460', '41462', '41464', '41466', '41468', '41469', '41472', '41564', '41748', '41749'],
  'paderborn': ['33098', '33100', '33102', '33104', '33106', '33129', '33142', '33154'],
  'bottrop': ['46236', '46238', '46240', '46242'],
  'recklinghausen': ['45657', '45659', '45661', '45663', '45665'],
  'bergisch gladbach': ['51465', '51467', '51469', '51427', '51429'],
  'remscheid': ['42853', '42855', '42857', '42859', '42897', '42899'],
  'moers': ['47441', '47443', '47445', '47447', '47449'],
  'siegen': ['57072', '57074', '57076', '57078', '57080'],
  'gütersloh': ['33330', '33332', '33334', '33335'],
  'iserlohn': ['58636', '58638', '58640', '58642', '58644', '58706'],
  'düren': ['52349', '52351', '52353', '52355'],
  'ratingen': ['40878', '40880', '40882', '40883', '40885'],
  'lüdenscheid': ['58507', '58509', '58511', '58513', '58515'],
  'marl': ['45768', '45770', '45772'],
  'velbert': ['42549', '42551', '42553', '42555', '42579'],
  'minden': ['32423', '32425', '32427', '32429'],
  'viersen': ['41747', '41749', '41751', '41753'],
  'troisdorf': ['53840', '53842', '53844'],
  'rheine': ['48429', '48431'],
  'detmold': ['32756', '32758', '32760'],
  'bocholt': ['46395', '46397', '46399'],
  'dorsten': ['46282', '46284', '46286', '46288'],
  'castrop-rauxel': ['44575', '44577', '44579', '44581'],
  'lünen': ['44532', '44534', '44536'],
  'gladbeck': ['45964', '45966', '45968'],
  'arnsberg': ['59755', '59757', '59759', '59821'],
  'hameln': ['31785', '31787', '31789'],
  'bergkamen': ['59192'],
  'dinslaken': ['46535', '46537', '46539'],
  'lippstadt': ['59555', '59557'],
  'hürth': ['50354'],
  'eschweiler': ['52249'],
  'herzogenrath': ['52134'],
  'sankt augustin': ['53757'],
  'pulheim': ['50259'],
  'langenfeld': ['40764'],
  'monheim': ['40789'],
  'königswinter': ['53639'],
  'siegburg': ['53721'],
  'hennef': ['53773'],
  'gummersbach': ['51643'],
  'bergheim': ['50126'],
  'erftstadt': ['50374'],
  'niederkassel': ['53859'],
  'wesseling': ['50389'],
  'brühl': ['50321'],
  'frechen': ['50226'],
  'kerpen': ['50169'],
  'euskirchen': ['53879'],
  'mechernich': ['53894'],
  'bad honnef': ['53604'],
  'wipperfürth': ['51688'],
  'overath': ['51491'],
  'rösrath': ['51503'],
  'kürten': ['51515'],
  'leichlingen': ['42799'],
  'wermelskirchen': ['42929'],
  'burscheid': ['51399'],

  // Rheinland-Pfalz (PLZ 5-6)
  'mainz': ['55116', '55118', '55120', '55122', '55124', '55126', '55127', '55128', '55129', '55131'],
  'ludwigshafen': ['67059', '67061', '67063', '67065', '67067', '67069', '67071'],
  'koblenz': ['56068', '56070', '56072', '56073', '56075', '56076', '56077'],
  'kaiserslautern': ['67655', '67657', '67659', '67661', '67663'],
  'trier': ['54290', '54292', '54293', '54294', '54295', '54296'],
  'worms': ['67547', '67549', '67550', '67551', '67552'],
  'neuwied': ['56564', '56566', '56567'],
  'speyer': ['67346'],
  'pirmasens': ['66953', '66955'],
  'frankenthal': ['67227'],
  'bad kreuznach': ['55543', '55545'],
  'neustadt': ['67433', '67435'],
  'landau': ['76829'],
  'zweibrücken': ['66482'],
  'alzey': ['55232'],
  'ingelheim': ['55218'],
  'bingen': ['55411'],
  'mayen': ['56727'],
  'andernach': ['56626'],
  'bad neuenahr': ['53474'],
  'remagen': ['53424'],
  'sinzig': ['53489'],
  'lahnstein': ['56112'],

  // Saarland (PLZ 6)
  'saarbrücken': ['66111', '66113', '66115', '66117', '66119', '66121', '66123', '66125'],
  'neunkirchen': ['66538', '66540'],
  'homburg': ['66424', '66424'],
  'völklingen': ['66333'],
  'saarlouis': ['66740'],
  'merzig': ['66663'],
  'sankt wendel': ['66606'],
  'sankt ingbert': ['66386'],
  'dillingen': ['66763'],
  'lebach': ['66822'],

  // Sachsen (PLZ 0-1)
  'dresden': ['01067', '01069', '01097', '01099', '01108', '01109', '01127', '01129', '01139', '01156', '01157', '01159', '01169', '01189', '01217', '01219', '01237', '01239', '01257', '01259', '01277', '01279', '01307', '01309', '01324', '01326', '01328', '01454', '01465', '01468', '01471', '01477', '01558', '01561', '01587', '01591', '01594', '01612', '01616', '01618', '01619', '01623', '01624', '01626', '01627', '01629'],
  'leipzig': ['04103', '04105', '04107', '04109', '04155', '04157', '04177', '04179', '04209', '04229', '04249', '04277', '04279', '04289', '04299', '04315', '04317', '04318', '04319', '04328', '04329', '04347', '04349', '04357', '04416', '04420', '04425', '04435', '04451', '04463', '04465', '04469', '04509', '04519', '04523', '04539', '04575', '04579', '04600', '04610', '04618', '04626', '04654', '04668', '04683', '04703', '04720', '04720'],
  'chemnitz': ['09111', '09112', '09113', '09114', '09116', '09117', '09119', '09120', '09122', '09123', '09125', '09126', '09127', '09128', '09130'],
  'zwickau': ['08056', '08058', '08062', '08064', '08066'],
  'plauen': ['08523', '08525', '08527', '08529'],
  'görlitz': ['02826', '02827', '02828', '02829'],
  'freiberg': ['09599', '09602'],
  'bautzen': ['02625', '02627'],
  'freital': ['01705'],
  'pirna': ['01796', '01809'],
  'radebeul': ['01445'],
  'meißen': ['01662'],
  'coswig': ['01640'],
  'riesa': ['01589'],
  'döbeln': ['04720'],
  'grimma': ['04668'],
  'eilenburg': ['04838'],
  'delitzsch': ['04509'],
  'markkleeberg': ['04416'],
  'limbach-oberfrohna': ['09212'],
  'glauchau': ['08371'],
  'reichenbach': ['08468'],
  'annaberg-buchholz': ['09456'],
  'stollberg': ['09366'],
  'schneeberg': ['08289'],
  'aue': ['08280'],
  'schwarzenberg': ['08340'],
  'mittweida': ['09648'],
  'brand-erbisdorf': ['09618'],
  'marienberg': ['09496'],
  'augustusburg': ['09573'],

  // Sachsen-Anhalt (PLZ 0)
  'magdeburg': ['39104', '39106', '39108', '39110', '39112', '39114', '39116', '39118', '39120', '39122', '39124', '39126', '39128', '39130'],
  'halle': ['06108', '06110', '06112', '06114', '06116', '06118', '06120', '06122', '06124', '06126', '06128', '06130', '06132'],
  'dessau': ['06844', '06846', '06862'],
  'wittenberg': ['06886', '06888'],
  'merseburg': ['06217'],
  'naumburg': ['06618'],
  'weißenfels': ['06667'],
  'stendal': ['39576'],
  'salzwedel': ['29410'],
  'halberstadt': ['38820'],
  'quedlinburg': ['06484'],
  'wernigerode': ['38855'],
  'sangerhausen': ['06526'],
  'eisleben': ['06295'],
  'aschersleben': ['06449'],
  'bernburg': ['06406'],
  'köthen': ['06366'],
  'zeitz': ['06712'],
  'schönebeck': ['39218'],
  'bitterfeld': ['06749'],
  'wolfen': ['06766'],

  // Schleswig-Holstein (PLZ 2)
  'kiel': ['24103', '24105', '24106', '24107', '24109', '24111', '24113', '24114', '24116', '24118', '24119', '24143', '24145', '24146', '24148', '24149', '24159'],
  'lübeck': ['23552', '23554', '23556', '23558', '23560', '23562', '23564', '23566', '23568', '23570', '23617', '23619', '23623', '23669'],
  'flensburg': ['24937', '24939', '24941', '24943'],
  'neumünster': ['24534', '24536', '24537'],
  'norderstedt': ['22844', '22846', '22848', '22850'],
  'elmshorn': ['25335', '25337'],
  'pinneberg': ['25421', '25423'],
  'itzehoe': ['25524', '25524'],
  'wedel': ['22880'],
  'ahrensburg': ['22926'],
  'geesthacht': ['21502'],
  'rendsburg': ['24768'],
  'schleswig': ['24837'],
  'heide': ['25746'],
  'husum': ['25813'],
  'bad segeberg': ['23795'],
  'oldenburg in holstein': ['23758'],
  'eutin': ['23701'],
  'preetz': ['24211'],
  'bad oldesloe': ['23843'],
  'reinbek': ['21465'],
  'glinde': ['21509'],
  'kaltenkirchen': ['24568'],
  'henstedt-ulzburg': ['24558'],
  'quickborn': ['25451'],
  'halstenbek': ['25469'],
  'schenefeld': ['22869'],
  'tornesch': ['25436'],
  'uetersen': ['25436'],
  'bargteheide': ['22941'],

  // Thüringen (PLZ 0)
  'erfurt': ['99084', '99085', '99086', '99087', '99089', '99090', '99091', '99092', '99094', '99095', '99096', '99097', '99098'],
  'jena': ['07743', '07745', '07747', '07749', '07751'],
  'gera': ['07545', '07546', '07548', '07549', '07552'],
  'weimar': ['99423', '99425', '99427'],
  'gotha': ['99867'],
  'nordhausen': ['99734'],
  'eisenach': ['99817'],
  'suhl': ['98527'],
  'mühlhausen': ['99974'],
  'altenburg': ['04600'],
  'saalfeld': ['07318'],
  'rudolstadt': ['07407'],
  'ilmenau': ['98693'],
  'arnstadt': ['99310'],
  'sonneberg': ['96515'],
  'meiningen': ['98617'],
  'bad salzungen': ['36433'],
  'heiligenstadt': ['37308'],
  'sömmerda': ['99610'],
  'pößneck': ['07381'],
  'greiz': ['07973'],
  'schmalkalden': ['98574'],
  'apolda': ['99510'],
  'bad langensalza': ['99947'],
  'leinefelde': ['37327']
};

// Street abbreviations mapping for German addresses
export const GERMAN_STREET_ABBREVIATIONS = {
  'str.': 'straße',
  'str': 'straße',
  'pl.': 'platz',
  'pl': 'platz',
  'weg.': 'weg',
  'allee.': 'allee',
  'gasse.': 'gasse',
  'ufer.': 'ufer',
  'ring.': 'ring',
  'damm.': 'damm',
  'berg.': 'berg',
  'feld.': 'feld',
  'hof.': 'hof',
  'park.': 'park'
};

/**
 * Advanced German Address Parsing Algorithm
 * Handles ALL German addresses including:
 * - Cities with Umlauts (München, Nürnberg, Düsseldorf)
 * - Compound city names (Frankfurt am Main, Rothenburg ob der Tauber)  
 * - City districts (Berlin-Mitte, München-Schwabing)
 * - Various address formats
 */
export class GermanAddressProcessor {
  
  constructor() {
    this.cities = COMPREHENSIVE_GERMAN_CITIES;
    this.abbreviations = GERMAN_STREET_ABBREVIATIONS;
  }

  /**
   * Clean and normalize German address input
   * @param {string} input - Raw address input
   * @returns {string} Cleaned and normalized input
   */
  normalizeInput(input) {
    if (!input) return '';
    
    let cleaned = input.trim().toLowerCase();
    
    // Expand street abbreviations
    Object.entries(this.abbreviations).forEach(([abbr, full]) => {
      const regex = new RegExp(`\\b${abbr}\\b`, 'gi');
      cleaned = cleaned.replace(regex, full);
    });
    
    // Remove extra spaces and normalize
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    return cleaned;
  }

  /**
   * Extract city name from various German address formats
   * @param {string} input - Normalized address input  
   * @returns {string|null} Extracted city name or null
   */
  extractCityName(input) {
    const patterns = [
      // "Street Number, City" - most common format
      /,\s*([a-zäöüß][a-zäöüß\s-]+)$/i,
      // "City, Street Number" - alternative format
      /^([a-zäöüß][a-zäöüß\s-]+),/i,
      // "PLZ City" format
      /\d{5}\s+([a-zäöüß][a-zäöüß\s-]+)$/i,
      // Just city name (single word or with spaces/hyphens)
      /^([a-zäöüß][a-zäöüß\s-]+)$/i
    ];

    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) {
        return match[1].trim().toLowerCase();
      }
    }

    return null;
  }

  /**
   * Find PLZ for a given German city using comprehensive database
   * @param {string} cityName - Normalized city name
   * @returns {object} {plz: string, confidence: string, source: string}
   */
  findCityPLZ(cityName) {
    // Direct exact match
    if (this.cities[cityName]) {
      return {
        plz: this.cities[cityName][0], // Return first (most central) PLZ
        confidence: 'high',
        source: `direct_match_${cityName}`
      };
    }

    // Partial match for compound city names
    // e.g., "frankfurt am main" should match "frankfurt"
    for (const [city, plzList] of Object.entries(this.cities)) {
      if (cityName.includes(city) || city.includes(cityName)) {
        return {
          plz: plzList[0],
          confidence: 'medium',
          source: `partial_match_${city}`
        };
      }
    }

    // Handle city districts (e.g., "berlin-mitte" -> "berlin")
    if (cityName.includes('-')) {
      const baseCityName = cityName.split('-')[0];
      if (this.cities[baseCityName]) {
        return {
          plz: this.cities[baseCityName][0],
          confidence: 'medium',
          source: `district_match_${baseCityName}`
        };
      }
    }

    // Handle "bad " prefix for spa towns
    if (cityName.startsWith('bad ')) {
      const cityWithoutBad = cityName.substring(4);
      if (this.cities[cityWithoutBad]) {
        return {
          plz: this.cities[cityWithoutBad][0],
          confidence: 'medium',
          source: `bad_prefix_${cityWithoutBad}`
        };
      }
      // Also check if full name with "bad" exists
      if (this.cities[cityName]) {
        return {
          plz: this.cities[cityName][0],
          confidence: 'high',
          source: `direct_match_${cityName}`
        };
      }
    }

    return {
      plz: '',
      confidence: 'none',
      source: 'not_found'
    };
  }

  /**
   * Fallback: Use OpenStreetMap Nominatim API for geocoding
   * @param {string} cityName - City name to geocode
   * @returns {Promise<object>} {plz: string, confidence: string, source: string}
   */
  async geocodeCityName(cityName) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(cityName)},Germany&` +
        `format=json&addressdetails=1&limit=1&countrycodes=de`,
        {
          headers: {
            'User-Agent': 'PLZ-Router/1.0 (https://plz-checker-webapp.vercel.app)'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Geocoding API error');
      }
      
      const data = await response.json();
      
      if (data.length > 0 && data[0].address) {
        const address = data[0].address;
        const plz = address.postcode;
        
        if (plz && /^\d{5}$/.test(plz)) {
          return {
            plz: plz,
            confidence: 'medium',
            source: 'nominatim_api'
          };
        }
      }
      
      return {
        plz: '',
        confidence: 'none',
        source: 'api_no_result'
      };
      
    } catch (error) {
      console.warn('Geocoding failed:', error);
      return {
        plz: '',
        confidence: 'none',
        source: 'api_error'
      };
    }
  }

  /**
   * Main processing method for German addresses
   * @param {string} input - Raw address input
   * @returns {Promise<object>} {plz: string, confidence: string, source: string, city?: string}
   */
  async processAddress(input) {
    if (!input) {
      return { plz: '', confidence: 'none', source: 'empty' };
    }

    const normalized = this.normalizeInput(input);

    // 1. Check if input is already a 5-digit PLZ
    const directPlzMatch = normalized.match(/^\d{5}$/);
    if (directPlzMatch) {
      return { 
        plz: directPlzMatch[0], 
        confidence: 'high', 
        source: 'direct_plz' 
      };
    }

    // 2. Extract PLZ from address with explicit PLZ
    const explicitPlzMatch = normalized.match(/\b(\d{5})\b/);
    if (explicitPlzMatch) {
      return { 
        plz: explicitPlzMatch[1], 
        confidence: 'high', 
        source: 'explicit_plz' 
      };
    }

    // 3. Extract city name and find PLZ
    const cityName = this.extractCityName(normalized);
    if (cityName) {
      // First try local database
      const localResult = this.findCityPLZ(cityName);
      if (localResult.plz) {
        return { ...localResult, city: cityName };
      }
      
      // Fallback to API geocoding for unknown cities
      const apiResult = await this.geocodeCityName(cityName);
      return { ...apiResult, city: cityName };
    }

    return { 
      plz: '', 
      confidence: 'none', 
      source: 'no_city_found' 
    };
  }

  /**
   * Get comprehensive error message based on processing result
   * @param {object} result - Processing result
   * @returns {string} User-friendly error message
   */
  getErrorMessage(result) {
    switch (result.source) {
      case 'empty':
        return 'Bitte geben Sie eine Adresse oder PLZ ein.';
      case 'not_found':
        return `Stadt "${result.city}" nicht gefunden. Bitte überprüfen Sie die Schreibweise.`;
      case 'no_city_found':
        return 'Keine Stadt in der Adresse erkannt. Verwenden Sie das Format: "Straße, Stadt" oder "PLZ".';
      case 'api_error':
        return 'Adressverarbeitung temporär nicht verfügbar. Versuchen Sie es mit der PLZ.';
      case 'api_no_result':
        return `Stadt "${result.city}" nicht gefunden. Bitte überprüfen Sie die Schreibweise oder verwenden Sie die PLZ.`;
      default:
        return 'Ungültige Adresse. Bitte geben Sie eine deutsche Adresse oder PLZ ein.';
    }
  }
}