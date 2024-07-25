export function one_ctl(raw_next) {
    // для функций, которые принимают только одну ctl
    if (raw_next.length > 1) {
        console.warn("Too many links");
    }
    return raw_next[0]
}