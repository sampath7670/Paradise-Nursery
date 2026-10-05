const plant = (id, name, priceCents, description, care) => ({ id, name, priceCents, description, care, image: `${import.meta.env.BASE_URL}images/${id}.svg` });

export const categories = [
  { id: 'easy-care', name: 'Easy-care favorites', description: 'An easy beginning to your indoor jungle.', plants: [
    plant('snake-plant', 'Snake Plant', 1800, 'Sculptural, upright leaves with golden edges.', 'Low to bright indirect light'),
    plant('zz-plant', 'ZZ Plant', 2400, 'Glossy leaves and a quietly architectural shape.', 'Low to medium indirect light'),
    plant('golden-pothos', 'Golden Pothos', 1600, 'Golden-flecked foliage that trails beautifully.', 'Medium indirect light'),
    plant('spider-plant', 'Spider Plant', 1400, 'A fountain of graceful, striped green leaves.', 'Bright indirect light'),
    plant('jade-plant', 'Jade Plant', 1900, 'A compact succulent with plump, oval leaves.', 'Bright light'),
    plant('aloe-vera', 'Aloe Vera', 1700, 'A striking rosette of fleshy, pointed leaves.', 'Bright light'),
  ] },
  { id: 'tropical', name: 'Tropical statement plants', description: 'Generous leaves. A little everyday escape.', plants: [
    plant('monstera', 'Monstera Deliciosa', 3500, 'Iconic split leaves for a lush green corner.', 'Bright indirect light'),
    plant('fiddle-leaf-fig', 'Fiddle Leaf Fig', 4200, 'Tall stems crowned with broad, sculptural leaves.', 'Bright indirect light'),
    plant('rubber-plant', 'Rubber Plant', 2900, 'Deep green foliage with a rich, glossy finish.', 'Bright indirect light'),
    plant('bird-of-paradise', 'Bird of Paradise', 4800, 'Paddle-shaped leaves with a tropical presence.', 'Bright light'),
    plant('areca-palm', 'Areca Palm', 3200, 'Soft, feathery fronds that fill a room with green.', 'Bright indirect light'),
    plant('philodendron', 'Heartleaf Philodendron', 2200, 'Delicate heart-shaped leaves on winding vines.', 'Medium indirect light'),
  ] },
  { id: 'color-texture', name: 'Color & texture', description: 'Beautiful details, from patterned leaves to gentle blooms.', plants: [
    plant('peace-lily', 'Peace Lily', 2500, 'Elegant white spathes above dark, arching foliage.', 'Medium indirect light'),
    plant('anthurium', 'Anthurium', 2800, 'Heart-shaped red spathes for a warm pop of color.', 'Bright indirect light'),
    plant('calathea', 'Calathea Orbifolia', 3000, 'Rounded leaves brushed with soft silver stripes.', 'Medium indirect light'),
    plant('prayer-plant', 'Prayer Plant', 2300, 'Intricately patterned leaves with rosy veins.', 'Medium indirect light'),
    plant('polka-dot-plant', 'Polka Dot Plant', 1500, 'Playful pink speckles on small, delicate leaves.', 'Bright indirect light'),
    plant('boston-fern', 'Boston Fern', 2100, 'A cloud of finely textured, arching green fronds.', 'Medium indirect light'),
  ] },
];
