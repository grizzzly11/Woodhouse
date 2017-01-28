/**
 * This module provides methods used to parse data received from wit.ai
 */

const entityExists = (entities, entity) => {
    return entities && entities[entity] &&
        Array.isArray(entities[entity]) &&
        entities[entity].length > 0;
}

const firstEntityValue = (entities, entity) => {
    let value;
    if (entityExists(entities, entity)) {
        value = entities[entity][0].value
    }
    if (!value) {
        return null;
    }
    return typeof value === 'object' ? value.value : value;
};

const firstNormalizedEntityValue = (entities, entity) => {
    let value;
    if (entityExists(entities, entity)) {
        value = entities[entity][0].normalized
    }
    if (!value) {
        return null;
    }
    return typeof value === 'object' ? value.value : value;
};

const getNormalizedDuration = (entities) => {
    let durationEntityName = 'duration';
    let normalizedDuration = 0;

    if (entityExists(entities, durationEntityName)) {
        let duration = entities[durationEntityName];
        duration.forEach((timeUnit) => {
            normalizedDuration += timeUnit.normalized.value;
        });
    }
    return normalizedDuration;
}

const firstEntityUnit = (entities, entity) => {
    const unit = entities && entities[entity] &&
        Array.isArray(entities[entity]) &&
        entities[entity].length > 0 &&
        entities[entity][0].unit
        ;
    if (!unit) {
        return null;
    }
    return typeof unit === 'object' ? unit.value : unit;
}

module.exports = {
    entityExists: entityExists,
    firstEntityValue: firstEntityValue,
    firstNormalizedEntityValue: firstNormalizedEntityValue,
    firstEntityUnit: firstEntityUnit,
    getNormalizedDuration: getNormalizedDuration
}