const db = require('../../data/db-config')

const getAll = () => {
  // SELECT * FROM accounts;
  return db('accounts');
}

const getById = (id) => {
  // SELECT * FROM accounts WHERE id = ?
  return db('accounts').where('id', id).first(); //.then(arrayResult => arrayResult[0]);
}

const create = account => {
  // INSERT INTO accounts (...) VALUES (...)
  return db('accounts').insert(account).then(arrayWithId => {
    return getById(arrayWithId[0]);
  });
}

const updateById = async (id, account) => {
  // UPDATE accounts SET shippername = ?, ... WHERE shipperid = ?
  return db('accounts')
    .where('id', id)
    .update(account)
    .then(numRowsAffected => {
      if(numRowsAffected === 0) {
        return null;
      }
      return getById(id);
    });
}

const deleteById = async id => {
  // DELETE FROM accounts WHERE id = ?
  const result = await getById(id);
  await db('accounts').where('id', id).delete();
  return result;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
