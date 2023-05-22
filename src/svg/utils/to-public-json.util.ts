export interface Svg {
    id: string;
    createdAt: string;
}

export interface PublicSvg {
    id: string;
    createdAt: string;
    originalUrl: string;
}

export interface GeneralSvg {
    idToSvg: {
        id: string
        createdAt: string;
        originalUrl: string;
    };
}

export const toPublicJSON = (svg: Svg): PublicSvg => {
    if (svg.id) {
        return {
            id: svg.id,
            originalUrl: `/files/${svg.id}_original.svg`,
            createdAt: svg.createdAt,
        };
    }
};