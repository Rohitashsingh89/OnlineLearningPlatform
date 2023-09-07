const Content = require("../model/content.js");

const addContent = async (req, res) => {
    try {
        const { title, url } = req.body;
        
        const newContent = Content({ title, url });
        await newContent.save();

        return res.status(201).json({ msg: "Content Added Successfully" });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while adding the Content" });
    }
}

const getContent = async (req, res) => {
    try {
        const ContentId = req.params._id;
        const content = await Content.findById(ContentId);

        if (!content) {
            return res.status(404).json({ msg: "Content not found" });
        }

        return res.status(200).json(content);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "An error occurred while fetching the Content" });
    }
}

const getContents = async (req, res) => {
    try {
        const allContent = await Content.find({}).sort({ timestamp: 'asc' });

        return res.status(200).json(allContent);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching all Content" });
    }
}

const getContentByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const content = await Content.find({ $or: [{ sender: userId }, { receiver: userId }] })
            .sort({ timestamp: 'asc' });

        return res.status(200).json(content);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while fetching Content" });
    }
}

const updateContent = async (req, res) => {
    try {
        const ContentId = req.params._id;
        const updatedContent = await Content.findByIdAndUpdate(ContentId, req.body, {
            new: true
        });

        if (!updatedContent) {
            return res.status(400).json({ msg: "No Content Found" });
        }

        return res.status(200).json(updatedContent);

    } catch (error) {
        return res.status(500).json({ error: "An error occurred while updating the Content" });
    }
}

const deleteContent = async (req, res) => {
    try {
        const ContentId = req.params._id;
        const deletedContent = await Content.findByIdAndDelete(ContentId);

        if (!deletedContent) {
            return res.status(400).json({ msg: "No Content Found" });
        }

        return res.status(200).json({ msg: "Content Deleted Successfully" });

    } catch (error) {
        return res.status(500).json({ error: "An error occurred while deleting the Content" });
    }
}

module.exports = {
    addContent,
    getContent,
    getContents,
    getContentByUser,
    updateContent,
    deleteContent,
}
  
