function searchProduct(query) {
  console.log('search for', query);

  if (!query || query.length < 1) {
    return null;
  }

  if (query && query.length > 4) {
    return [];
  }

  if (query && query.length > 2) {
    return [
      {
        name: 'Pommes',
        energy: 47,
        source: 1,
      },
    ];
  }

  return [
    {
      name: 'Bananes',
      energy: 25,
      source: 1, // ingredients base
    },
    {
      name: 'Recette magique',
      energy: 450,
      source: 3, // recipes
    },
    {
      name: 'Carrote',
      energy: 13,
      source: 2, // previous log
    },
    {
      name: 'Carrote 2',
      energy: 13,
      source: 2, // previous log
    },
    {
      name: 'Carrote 3',
      energy: 13,
      source: 2, // previous log
    },
    {
      name: 'Carrote 4',
      energy: 13,
      source: 2, // previous log
    },
    {
      name: 'Carrote 5',
      energy: 13,
      source: 2, // previous log
    },
    {
      name: 'Carrote 6',
      energy: 13,
      source: 2, // previous log
    },
    {
      name: 'Carrote 7',
      energy: 13,
      source: 2, // previous log
    },
    {
      name: 'Carrote 8',
      energy: 13,
      source: 2, // previous log
    },
    {
      name: 'Carrote 9',
      energy: 13,
      source: 2, // previous log
    },
  ];
}

export default searchProduct;
