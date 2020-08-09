
function dedent(s) {
  const firstLine = s.split('\n').find(s2 => s2.length);
  const spaceCount = /^ */.exec(firstLine)[0].length;
  return s.replace(new RegExp(`^[ ]{${spaceCount}}`, 'gm'), '').trim();
}

export {
  dedent,
};
