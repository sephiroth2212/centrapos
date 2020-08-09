const components = [
  {
    name: 'colors',
    component: () => import(/* webpackChunkName: "examples" */ '@/components/pages/Colors'),
  },
  {
    name: 'typography',
    component: () => import(/* webpackChunkName: "examples" */ '@/components/pages/Typography'),
  },
  {
    name: 'spacing',
    component: () => import(/* webpackChunkName: "examples" */ '@/components/pages/Spacing'),
  },
];

function nameToTitle(s) {
  return s.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}

components.forEach(c => {
  c.title = nameToTitle(c.name);
});

export default components;
