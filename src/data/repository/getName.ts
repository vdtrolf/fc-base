import Name from "../model/name";


export const getName = async (dbHelper, id) : Promise<Name> => {

  const name : Name = (await dbHelper.getItem("person_names",id)) as unknown as Name;
  return name;
}