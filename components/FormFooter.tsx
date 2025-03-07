interface FormFooterProps {
  text: string;
  linkText: string;
  linkHref: string;
}

const FormFooter: React.FC<FormFooterProps> = ({
  text,
  linkText,
  linkHref,
}) => (
  <p className="text-center text-sm text-gray-600">
    {text}{" "}
    <a
      href={linkHref}
      className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
    >
      {linkText}
    </a>
  </p>
);

export default FormFooter;
