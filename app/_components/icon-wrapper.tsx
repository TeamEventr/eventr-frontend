//Up to date
//No changes 

export default function Icon({ icon, size = '24px', fill=0, className='' }: {icon: string; size?: string; fill?: number; className?: string}) {
    return (     
        <span className={`flex items-center material-symbols-rounded ${className}`} style={{ fontSize: size, fontVariationSettings: `'FILL' ${fill}, 'wght' 400, 'GRAD' 0, 'opsz' 24`} }>
        {icon}
        </span>
    )
}