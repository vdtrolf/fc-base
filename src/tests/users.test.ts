import { createUser } from '../data/repository/createUser'
import { getUser } from '../data/repository/getUser'
import { AcebaseDBHelper } from "../helpers/acebaseHelper"

const dbHelper = new AcebaseDBHelper(true, false) ;

beforeEach(async () => {
  await dbHelper.createDb(true)
});

describe("createUser",  () => {

  it("it should create a user and retrieve it", async () =>  {
   
    const testUser = {id:999,name:"toto",email:"toto@tatamail.com",password:"titi",role:1,domain:1,creationDate:"testDate"}
    const expectedUser = {item : testUser}
    createUser(dbHelper,testUser)
    .then ( result => {

        getUser(dbHelper,999)
        .then ( returnedUser => expect(returnedUser).toEqual(expectedUser))
      }
    )

  });
});

