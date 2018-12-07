export function getLanguageFromKey(key: string, language: any) {
  const name = getNestedObject(language, key.split('.'));
  if (name === undefined) {
    return key;
  } else {
    return name;
  }
}

export function getNestedObject(nestedObj: any, pathArr: string[]) {
  return pathArr.reduce((obj, key) =>
    (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}