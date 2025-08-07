export default function handler(req, res) {
  const { plz } = req.query;
  if (!plz || !/^\d{5}$/.test(plz)) {
    res.status(400).json({ error: 'Ungültige PLZ. Bitte geben Sie eine 5-stellige Zahl ein.' });
    return;
  }
  const first = plz[0];
  let person, land;
  if ('789'.includes(first)) {
    person = 'Anna Kropfitsch';
    land = 'Bayern';
  } else if ('356'.includes(first)) {
    person = 'Carmen Bergar';
    land = 'Hessen';
  } else if ('0124'.includes(first)) {
    person = 'Mattias Herbst';
    land = 'Hamburg';
  } else {
    res.status(400).json({ error: 'PLZ nicht zuordenbar.' });
    return;
  }
  res.status(200).json({ person, land });
}
