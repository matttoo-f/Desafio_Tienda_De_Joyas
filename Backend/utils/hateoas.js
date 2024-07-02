// utils/hateoas.js
const generateHATEOAS = (resource, id) => {
    return {
        data: resource,
        links: [
            {
                rel: 'self',
                href: `/joyas/${id}`
            },
            {
                rel: 'all',
                href: `/joyas`
            },
            {
                rel: 'update',
                href: `/joyas/${id}`
            },
            {
                rel: 'delete',
                href: `/joyas/${id}`
            }
        ]
    };
};

const generateJoyasResponse = (joyas) => {
    const totalJoyas = joyas.length;
    const stockJoyas = joyas.reduce((total, joya) => total + joya.stock, 0);

    const results = joyas.map(joya => generateHATEOAS(joya, joya.id));

    return {
        total_joyas: totalJoyas,
        stock_joyas: stockJoyas,
        results: results
    };
};

module.exports = {
    generateHATEOAS,
    generateJoyasResponse
};
