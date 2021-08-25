import Classes from './button.module.scss';

export default function Button(props) {
    return (
        <button className={`${props.className} ${Classes.Button}`}>
            {props.children}
        </button>
    )
};
