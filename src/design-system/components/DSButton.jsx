const DSButton = ({ variant = "primary", type = "button", children, ...props }) => {
  const variantClass = `ds-btn-${variant}`;
  return (
    <button type={type} className={`ds-btn ${variantClass}`} {...props}>
      {children}
    </button>
  );
};

export default DSButton;
