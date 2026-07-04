import Parse from 'parse/node.js';
const APPID='p0I3hHAOKgnCUt2ZycR4hiOTW2tJwYE3kekU1UvK';
const KEY='wltXmWRpYnio5EhAIKFqHJkgfAfdyYQiqByqg63u';
Parse.initialize(APPID); Parse.serverURL='https://parseapi.back4app.com/';
const c=Parse.CoreManager.getRESTController(); const oa=c.ajax;
c.ajax=function(m,u,d,h,o){h=h||{};h['X-Parse-Client-Key']=KEY;return oa.call(this,m,u,d,h,o);};
Parse.CoreManager.setRESTController(c);
const U='demo', P='calvinball123';
try {
  const u=new Parse.User(); u.setUsername(U); u.setPassword(P); u.setEmail('demo@upsynq.com');
  await u.signUp();
  console.log('CREATED demo user:', U, '/', P);
  await Parse.User.logOut();
} catch(e){
  if(e.code===202||e.code===203){ console.log('demo user already exists — credentials:', U,'/',P); }
  else { console.log('signup error code', e.code, e.message); }
}
// verify login works
try { const lu=await Parse.User.logIn(U,P); console.log('LOGIN VERIFIED for', lu.getUsername()); await Parse.User.logOut(); }
catch(e){ console.log('login verify failed code', e.code, e.message); }
