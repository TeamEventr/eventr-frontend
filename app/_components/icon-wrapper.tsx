export default function Icon({ icon, size = '24px', fill=0 }: {icon: string; size?: string; fill?: number;}) {
    return (     
        // <span className={`material-symbols-rounded ${fill? 'filled' : ''}`} style={{ fontSize: size }}>
        <span className={`material-symbols-rounded`} style={{ fontSize: size, fontVariationSettings: `'FILL' ${fill}, 'wght' 400, 'GRAD' 0, 'opsz' 24`} }>
        {icon}
        </span>
    )
}