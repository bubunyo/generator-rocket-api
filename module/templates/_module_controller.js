import HTTPStatus from 'http-status';
import <%= module %> from './<%= table %>.model';

export const get<%= module %> = async (req, res) => {
  const id = req.id;

  const <%= table %> = await <%= module %>.findById(id);
  if (!<%= table %>) {
    res.sendStatus(HTTPStatus.NOT_FOUND);
    return;
  }
  res.send(<%= table %>);
};

export const create<%= module %> = async (req, res) => {
  const <%= table %> = await <%= module %>.create({ ...req.body });

  res.status(HTTPStatus.CREATED).json(<%= table %>);
};

export const update<%= module %> = async (req, res) => {
  const id = req.id;

  const <%= table %> = await <%= module %>.findById(id);
  if (!<%= table %>) {
    res.sendStatus(HTTPStatus.NOT_FOUND);
    return;
  }

  Object.keys(req.body).forEach((key) => {
    <%= table %>[key] = req.body[key];
  });

  await <%= table %>.save();

  res.status(HTTPStatus.OK).json(<%= table %>.toJson());
};


export const delete<%= module %> = async (req, res) => {
  const id = req.id;

  const <%= table %> = await <%= module %>.findById(id);
  if (!<%= table %>) {
    res.sendStatus(HTTPStatus.NOT_FOUND);
    return;
  }

  await <%= table %>.destroy();

  res.sendStatus(HTTPStatus.NO_CONTENT);
};

