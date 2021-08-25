import Classes from './links.module.scss'

export default function OutLink(props) {
  return(
    <a href={props.href} target={props.target} className={`${props.className} ${Classes.Outlink}`}>
      {props.children}
    </a>
  );
};
