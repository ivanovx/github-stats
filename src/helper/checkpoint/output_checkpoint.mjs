import checkpointFile from '../../helper/file/checkpoint_file.mjs';
import CheckpointDataModel from '../../model/data/CheckpointDataModel.mjs';

let outputCheckpoint = (function () {
    let saveCheckpointFile = async function (locationsArray, country, checkpoint) {
        let indexOfTheCountry = locationsArray.findIndex(location => location.country === country);
        if (indexOfTheCountry === checkpoint) {
            console.log("checkpoint updated", country)
            if(indexOfTheCountry >= locationsArray.length - 1){
                await checkpointFile.outputCheckpointFile(new CheckpointDataModel(0));
            } else {
                await checkpointFile.outputCheckpointFile(new CheckpointDataModel(indexOfTheCountry + 1 ))
            }
        }
    }

    let readCheckpointFile = async function () {
        return await checkpointFile.readCheckpointFile();
    }

    return {
        saveCheckpointFile: saveCheckpointFile,
        readCheckpointFile: readCheckpointFile
    };
})();

export default outputCheckpoint;