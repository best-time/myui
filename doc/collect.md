## fakerjs
```javascript
// ESM
import  {faker}  from  "@faker-js/faker";
// CJS
const  {faker} =  require("@faker-js/faker");
export  function  createRandomUser() {    
  return  {       
  userId: faker.string.uuid(),       
  username: faker.internet.username(),       
  email: faker.internet.email(),       
  avatar: faker.image.avatar(),       
  password: faker.internet.password(),       
  birthdate: faker.date.birthdate(),       
  registeredAt: faker.date.past(),   
  };
}
export const users = faker.helpers.multiple(createRandomUser, {    
count:  5,
});
```

```javascript
import  {de, de_CH,  Faker}  from  "@faker-js/faker";
export  const  faker =  new  Faker({    
  locale: [de_CH, de],
});
```

module 方式
```html
<script  type="module">    
import  {faker}  from  'https://esm.sh/@faker-js/faker';    
 
const  randomName = faker.person.fullName();    
const  randomEmail = faker.internet.email();    
document.getElementById('name').value  = randomName;    
document.getElementById('email').value  = randomEmail;
</script>
<input  id="name"  />
<input  id="email"  />
```
