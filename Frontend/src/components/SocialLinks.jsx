import { FaGithub, FaFacebookF, FaDiscord, FaInstagram } from 'react-icons/fa';

const icons = {
    github: FaGithub,
    facebook: FaFacebookF,
    discord: FaDiscord,
    instagram: FaInstagram,
};

const SocialLinks = ({ link, name }) => {
    const Icon = icons[name.toLowerCase()];

    return (
        <a
            href={link}
            title={name}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
        >
            <Icon className="text-xl transition-transform duration-300 group-hover:scale-110" />
        </a>
    );
};

export default SocialLinks;