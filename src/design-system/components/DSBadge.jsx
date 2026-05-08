const DSBadge = ({ tone = "brand", children }) => {
  return <span className={`ds-badge ds-badge-${tone}`}>{children}</span>;
};

export default DSBadge;
