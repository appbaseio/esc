import navSearchbar from
'../../content/docs/searchbar/nav.yml';
import navTagwiseSearch from
'../../content/docs/tagwise-search/nav.yml';
import navPhraseSearch from
'../../content/docs/phrase-search/nav.yml';

const nav = [...navSearchbar, ...navTagwiseSearch, ...navPhraseSearch];

const sectionListDocs = nav.map(item => ({
  ...item,
  directory: 'docs',
}));

export {sectionListDocs, nav};
