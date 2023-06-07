const postValidate = (req, res, next) => {
  const { name, status, gender, origin, location, image, species } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name!" });
  if (!status) return res.status(400).json({ error: "Missing status!" });
  if (!gender) return res.status(400).json({ error: "Missing gender!" });
  if (!origin) return res.status(400).json({ error: "Missing origin!" });
  if (!location) return res.status(400).json({ error: "Missing location!" });
  if (!image) return res.status(400).json({ error: "Missing image!" });
  if (!species) return res.status(400).json({ error: "Missing species!" });

  next();
};

module.exports = { postValidate };
