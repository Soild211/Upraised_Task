import gadget from '../Models/gadget.model.js';
import { generateCodename, generateSuccessProbability } from '../Utils/generators.js';

export const getAllGadgets = async (req, res) => {
  try {
    const { status } = req.query
    let gadgets
    if(status){
    gadgets= await gadget.findAll({
      where:{
        status : status
      }
    });  
    }
    else
    {
     gadgets = await gadget.findAll();
    }
    const gadgetsWithProbability = gadgets.map((gadget) => ({
      ...gadget.toJSON(),
      missionSuccessProbability: generateSuccessProbability(),
    }));
    res.status(200).json(gadgetsWithProbability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createGadget = async (req, res) => {
  try {
    const { name } = req.body;

    const existingGadget = await gadget.findOne({
      where: { name },
    });

    if (existingGadget) {
      return res.status(400).json({ error: 'A gadget with this name already exists.' });
    }

    
    const codename = generateCodename();

    const newGadget = await gadget.create({ name, codename });

    res.status(201).json(newGadget);
  } catch (error) {
    
    
    res.status(500).json({ error: error.message });
  }
};


export const updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const gadgetToUpdate = await gadget.findByPk(id);
    if (!gadgetToUpdate) return res.status(404).json({ error: 'Gadget not found' });
    await gadgetToUpdate.update(req.body);
    res.status(200).json(gadgetToUpdate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const decommissionGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const gadgetToDecommission = await gadget.findByPk(id);
    if (!gadgetToDecommission) return res.status(404).json({ error: 'Gadget not found' });
    await gadgetToDecommission.update({ status: 'Decommissioned', decommissionedAt: new Date() });
    res.status(200).json(gadgetToDecommission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const selfDestruct = async (req, res) => {
  try {
    const { id } = req.params;
    const GadgetToDelete = await gadget.findByPk(id);
    if (!GadgetToDelete) return res.status(404).json({ error: 'Gadget not found' });
    const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    await GadgetToDelete.destroy();
    res.status(200).json({ message: 'Self-destruct sequence initiated.', confirmationCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
