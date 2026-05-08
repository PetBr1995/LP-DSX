const DSCard = ({ title, description, children }) => {
  return (
    <article className="ds-card">
      {title ? <h3 className="ds-title">{title}</h3> : null}
      {description ? <p className="ds-text-muted">{description}</p> : null}
      {children}
    </article>
  );
};

export default DSCard;
