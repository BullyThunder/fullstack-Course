let generateId = (items) =>{
  const maxID = items.length > 0
  ? Math.max(...items.map(n=>Number(n.id))) :0;
  return String(maxID + 1);
}

module.exports = generateId;