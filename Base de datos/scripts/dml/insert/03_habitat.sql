SET client_encoding = 'UTF8';

INSERT INTO HABITAT (Nombre, CostoBase, IDUbicacion, IdClima) VALUES
-- Habitats tropicales
('Selva densa tropical', 16226.08, (SELECT ID FROM UBICACION WHERE Nombre = 'Zona Tropical'), (SELECT ID FROM CLIMA WHERE Nombre = 'Tropical')),
('Llanura africana',  7663.32, (SELECT ID FROM UBICACION WHERE Nombre = 'Sabana Africana'), (SELECT ID FROM CLIMA WHERE Nombre = 'Tropical')),
('Humedal tropical', 13350.56, (SELECT ID FROM UBICACION WHERE Nombre = 'Bosque Lluvioso'), (SELECT ID FROM CLIMA WHERE Nombre = 'Lluvioso')),

-- Habitats deserticos
('Desierto arenoso', 19947.11, (SELECT ID FROM UBICACION WHERE Nombre = 'Zona Desertica'), (SELECT ID FROM CLIMA WHERE Nombre = 'Desertico')),
('Cañón seco',  9803.23, (SELECT ID FROM UBICACION WHERE Nombre = 'Zona de Reptiles'), (SELECT ID FROM CLIMA WHERE Nombre = 'Arido')),

-- Habitats montañosos
('Pico nevado', 16689.14, (SELECT ID FROM UBICACION WHERE Nombre = 'Zona de Montaña'), (SELECT ID FROM CLIMA WHERE Nombre = 'Alpino')),
('Bosque templado alto',  7994.99, (SELECT ID FROM UBICACION WHERE Nombre = 'Zona de Montaña'), (SELECT ID FROM CLIMA WHERE Nombre = 'Templado')),

-- Habitats acuaticos
('Reef coralino',  9336.00, (SELECT ID FROM UBICACION WHERE Nombre = 'Acuario'), (SELECT ID FROM CLIMA WHERE Nombre = 'Marino')),
('Manglares costeros', 19703.82, (SELECT ID FROM UBICACION WHERE Nombre = 'Acuario'), (SELECT ID FROM CLIMA WHERE Nombre = 'Humedo')),

-- Aviarios
('Santuario de aves tropicales', 18322.90, (SELECT ID FROM UBICACION WHERE Nombre = 'Aviario'), (SELECT ID FROM CLIMA WHERE Nombre = 'Tropical')),
('Páramo de aves rapaces', 15134.96, (SELECT ID FROM UBICACION WHERE Nombre = 'Aviario'), (SELECT ID FROM CLIMA WHERE Nombre = 'Seco')),

-- Habitats de animals.CLIMA frio
('Tundra ártica', 11647.01, (SELECT ID FROM UBICACION WHERE Nombre = 'Habitat Artico'), (SELECT ID FROM CLIMA WHERE Nombre = 'Polar')),
('Bosque de coníferas', 17211.45, (SELECT ID FROM UBICACION WHERE Nombre = 'Zona de Montaña'), (SELECT ID FROM CLIMA WHERE Nombre = 'Polar')),

-- Otros Habitats especificos
('Vivero tropical', 17611.37, (SELECT ID FROM UBICACION WHERE Nombre = 'Jardin Botanico'), (SELECT ID FROM CLIMA WHERE Nombre = 'Humedo')),
('Estepa continental', 12877.82, (SELECT ID FROM UBICACION WHERE Nombre = 'Pradera'), (SELECT ID FROM CLIMA WHERE Nombre = 'Continental')),
('Refugio crepuscular', 13332.48, (SELECT ID FROM UBICACION WHERE Nombre = 'Habitat Nocturno'), (SELECT ID FROM CLIMA WHERE Nombre = 'Nuboso')),
('Costa rocosa',  9518.37, (SELECT ID FROM UBICACION WHERE Nombre = 'Playa Artificial'), (SELECT ID FROM CLIMA WHERE Nombre = 'Marino')),

-- Zonas de exhibicion y conservacion
('Exhibición de biomas', 18507.38, (SELECT ID FROM UBICACION WHERE Nombre = 'Area de Exhibicion'), (SELECT ID FROM CLIMA WHERE Nombre = 'Templado')),
('Reserva de fauna', 14005.16, (SELECT ID FROM UBICACION WHERE Nombre = 'Centro de Conservacion'), (SELECT ID FROM CLIMA WHERE Nombre = 'Templado')),

-- Areas especificas para grupos de animales
('Territorio felino',  5851.57, (SELECT ID FROM UBICACION WHERE Nombre = 'Recinto de Grandes Felinos'), (SELECT ID FROM CLIMA WHERE Nombre = 'Tropical')),
('Insectario tropical', 18496.67, (SELECT ID FROM UBICACION WHERE Nombre = 'Zona de Insectos'), (SELECT ID FROM CLIMA WHERE Nombre = 'Humedo')),
('Valle de aves',  6220.93, (SELECT ID FROM UBICACION WHERE Nombre = 'Zona de Aves'), (SELECT ID FROM CLIMA WHERE Nombre = 'Lluvioso')),
('Llanura de mamíferos',  8990.96, (SELECT ID FROM UBICACION WHERE Nombre = 'Zona de Mamiferos'), (SELECT ID FROM CLIMA WHERE Nombre = 'Continental'));