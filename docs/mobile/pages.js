(() => {
  const labels = {home:['Home','首页'],download:['Download','下载'],privacy:['Privacy policy','隐私政策'],support:['Support','支持与反馈'],help:['Get started','使用说明'],skip:['Skip to content','跳到正文'],resources:['Useful links','相关链接'],issues:['Report an issue on GitHub','在 GitHub 报告问题'],contact:['Contact support','联系支持']};
  function apply(lang) {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-language]').forEach(el => { el.hidden = el.dataset.language !== lang; });
    document.querySelectorAll('[data-key]').forEach(el => { el.textContent = labels[el.dataset.key][lang === 'zh' ? 1 : 0]; });
    document.getElementById('language').textContent = lang === 'zh' ? 'EN' : '中文';
    document.getElementById('language').setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到简体中文');
    document.title = document.querySelector('[data-language="'+lang+'"] h1').textContent + ' · Cowork';
    document.querySelectorAll('a[data-local]').forEach(el => {const url = new URL(el.href);url.searchParams.set('lang',lang);el.href=url.pathname+url.search+url.hash;});
    try { localStorage.setItem('cowork-lang', lang); } catch {}
  }
  let saved; try { saved=localStorage.getItem('cowork-lang'); } catch {}
  const query=new URLSearchParams(location.search).get('lang');
  apply(['en','zh'].includes(query)?query:['en','zh'].includes(saved)?saved:/^zh/i.test(navigator.language)?'zh':'en');
  document.getElementById('language').addEventListener('click',()=>apply(document.documentElement.lang==='en'?'zh':'en'));
})();
