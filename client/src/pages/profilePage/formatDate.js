export default function formatDate (dateString) {
    if (!dateString) {
        return "N/A"
    } else {
        return new Date(dateString).toLocaleDateString()
    }
}