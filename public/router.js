/* Premium URL router: /pl/, /en/servers, /de/term-of-use, etc. */
const CoppysRoutes={
  landing:'',
  servers:'servers',
  dashboard:'dashboard',
  gateway:'gateway',
  terms:'term-of-use',
  privacy:'privacy-policy'
};
const routeBySlug=Object.fromEntries(Object.entries(CoppysRoutes).map(([view,slug])=>[slug,view]));
const supportedLanguages=['pl','en','de','fr','ja'];

function getPathState(){
  const parts=window.location.pathname.split('/').filter(Boolean);
  const language=supportedLanguages.includes(parts[0])?parts[0]:(AppState.language||'pl');
  const view=routeBySlug[parts[1]||'']||'landing';
  return {language,view};
}

function pathFor(view,language=AppState.language){
  const slug=CoppysRoutes[view]??'';
  return `/${language}/${slug}`.replace(/\/$/,'/')
}

function switchPremiumView(view){
  if((view==='servers'||view==='dashboard')&&!AppState.user){
    navigate('landing',AppState.language,true);
    return;
  }
  document.querySelectorAll('.view').forEach(element=>element.classList.toggle('active',element.id===view));
  AppState.currentView=view;
  if(view==='servers')renderGuilds();
  if(view==='dashboard')renderDashboard();
  window.scrollTo({top:0,behavior:'smooth'});
}

function route(){
  const {language,view}=getPathState();
  if(AppState.language!==language){
    AppState.language=language;
    localStorage.setItem('coppys-language',language);
    applyLanguage();
  }
  document.querySelectorAll('a[data-route]').forEach(link=>{link.href=pathFor(link.dataset.route,language)});
  switchPremiumView(view);
}

function navigate(view,language=AppState.language,replace=false){
  const target=pathFor(view,language);
  if(window.location.pathname!==target){
    window.history[replace?'replaceState':'pushState']({},'',target);
  }
  route();
}

window.route=route;
window.switchView=switchPremiumView;
window.navigate=navigate;
window.addEventListener('popstate',route);

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  const view=link.getAttribute('href').slice(1)||'landing';
  if(!CoppysRoutes[view])return;
  link.dataset.route=view;
  link.href=pathFor(view);
});

document.addEventListener('click',event=>{
  const link=event.target.closest('a[data-route]');
  if(!link)return;
  const view=link.dataset.route;
  event.preventDefault();
  event.stopImmediatePropagation();
  navigate(view);
},true);

document.addEventListener('click',event=>{
  const languageOption=event.target.closest('[data-lang]');
  if(!languageOption)return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const language=languageOption.dataset.lang;
  localStorage.setItem('coppys-language',language);
  AppState.language=language;
  applyLanguage();
  document.querySelector('#language-select').classList.remove('open');
  navigate(AppState.currentView||'landing',language);
},true);

route();
