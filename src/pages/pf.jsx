import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Edit,
    MoreHorizontal,
    Users,
    CheckCircle,
    X,
    MapPin,
    Search,
    Plus,
    Trash2,
    Clock,
    Building,
    ChevronDown,
    ChevronUp,
    Save,
} from "lucide-react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DateTimePicker } from "react-tempusdominus-bootstrap";
import moment from "moment";
import {
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import ColdForm from "./coldForm";
import { api } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import CardInfoAction from "./cardInfoFormationAction";
import CiblagModal from "../components/modal/ciblage";
import getInitial from "../utils/getInitial";

const ProfileDashboard = () => {
    const navigate = useNavigate();
    const { code } = useParams();
    const [alert, setAlert] = useState(false);
    const [addSession, setAddSession] = useState(false);
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const [searchFilter, setSearchFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showAddMember, setShowAddMember] = useState(false);
    const [pfData, setPfData] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [participantSearch, setParticipantSearch] = useState("");
    const [showAllParticipants, setShowAllParticipants] = useState(false);
    const [modalCiblage, setModalCiblage] = useState(false);

    const closeModal = () => {
        setSelectedSession(null);
        setAddSession(false); 
        setShowAddMember(false);
        setParticipantSearch("");
        setShowAllParticipants(false);
        // Reset session data when closing modal
        setSessionData({
            startDate: moment()
                .add(1, "day")
                .hour(8)
                .minute(0)
                .second(0)
                .millisecond(0)
                .format("YYYY-MM-DD HH:mm"),
            endDate: moment()
                .add(1, "day")
                .hour(12)
                .minute(0)
                .second(0)
                .millisecond(0)
                .format("YYYY-MM-DD HH:mm"),
            lieu: "",
            ville: "",
            formateur: "",
            status: "", 
            teacher: "",
        });
    };

    const handleOpenModalCiblag = () => {
        setModalCiblage(true);
    };

    const handleCloseModalCiblag = () => {
        setModalCiblage(false);
    };

    const [sessionData, setSessionData] = useState({
        startDate: moment()
            .add(1, "day")
            .hour(8)
            .minute(0)
            .second(0)
            .millisecond(0)
            .format("YYYY-MM-DD HH:mm"),
        endDate: moment()
            .add(1, "day")
            .hour(12)
            .minute(0)
            .second(0)
            .millisecond(0)
            .format("YYYY-MM-DD HH:mm"),
        lieu: "",
        ville: "",
        formateur: "",
        status: "", 
        teacher: "",
    });

    const [imgPic, setImgPic] = useState(null);

    const _getImage = async () => {
        try {
            const response = await api.get(`formation/${code}/pic.png`);
            console.log(response.data);
            setImgPic(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            console.log("blabla");
        }
    };

    const handleDeleteClick = () => {
        setOpen(true);
    };

    const handleConfirmSession = () => {
        saveSession();
        setSelectedSession(null);
    };

    const handleConfirmDelete = () => {
        deleteSession(selectedSession?.code_session);
        setSelectedSession(null);
        setOpen(false);
    };

    // Fonction pour créer la session - CORRIGÉE
    const createSession = async () => {
    setSaving(true);
    try {
            // Initialiser les participants comme un tableau vide pour une nouvelle session
            const participants = [];
            
        const updateData = {
            code_formation: code,
            start_datetime: sessionData.startDate,
            end_datetime: sessionData.endDate,
            location: sessionData.lieu,
            city: sessionData.ville,
            status: sessionData.status,
            teacher: sessionData.teacher,
                participants: participants,
        };

        const response = await api.post(
            `insert/info/sessionformation/${code}`,
            updateData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
            
        console.log("create", response);
            
            if (response.status === 200 || response.status === 201) {
                // Recharger la liste des sessions
                await handleGetSession();
                
                toast.success("Session créée avec succès", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                
                closeModal();
            }
    } catch (error) {
            console.error("Error while creating:", error);
            toast.error("Erreur lors de la création de la session", {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
            });
        } finally {
            setSaving(false);
        }
    };

    // Fonction pour sauvegarder la session - CORRIGÉE
    const saveSession = async () => {
setSaving(true);
        
const updateData = {
    code_session: selectedSession.code_session,
    start_datetime: sessionData.startDate,
    end_datetime: sessionData.endDate,
    location: sessionData.lieu,
    city: sessionData.ville,
    status: sessionData.status,
    teacher: sessionData.teacher,
            participants: selectedSession.participants || [],
};
        
try {
    const response = await api.put(
        `put/info/sessionformation/${selectedSession.code_session}`,
        updateData,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
            
    if (response.status === 200) {
                toast.success("Modification effectuée avec succès", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
                    closeOnClick: true, 
                    pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    // Mettre à jour la session dans la liste
    setSessions((prev) =>
        prev.map((session) => {
            if (session.id === selectedSession.id) {
                            return {
                    ...session,
                    start_datetime: sessionData.startDate,
                    end_datetime: sessionData.endDate,
                    location: sessionData.lieu,
                    city: sessionData.ville,
                    status: sessionData.status,
                    teacher: sessionData.teacher,
                    color: getSessionColor({
                        ...session,
                        status: sessionData.status,
                    }),
                };
            }
            return session;
        })
                );

                closeModal(); // Fermer le modal après sauvegarde réussie
            }
} catch (error) {
    console.error("Error while saving:", error);
            toast.error("Erreur lors de la sauvegarde", {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
            });
        } finally {
    setSaving(false);
}
};

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const _status = [
    "Planifiée",
    "Reportée",
    "Terminée",
    "En cours de planification",
    "En cours d'exécution",
    "Attente de rédaction du cahier des charges",
    "Attente de validation du cahier des charges",
    "Appel d'offres en cours",
    ];

    // Fonction pour supprimer une session de formation - CORRIGÉE
const deleteSession = async (codeSession) => {
    try {
            const response = await api.delete(
            `delete/info/sessionformation/${codeSession}`
        );
            
        if (response.status === 200) {
                // Recharger la liste des sessions
                await handleGetSession();
                
                toast.success("Suppression effectuée avec succès", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
                
                closeModal();
        }
    } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Erreur lors de la suppression", {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
            });
        }
    };

const handleGetSession = async () => {
    try {
        const response = await api.get(`formation/${code}/sessions`);
        if (response.status === 200) {
            console.log("reponse sessions", response.data.data);
                // S'assurer que chaque session a un tableau de participants
                const sessionsWithParticipants = response.data.data.map(session => ({
                    ...session,
                    participants: session.participants || []
                }));
                setSessions(sessionsWithParticipants);
            }
        } catch (error) {
            console.error("Error fetching sessions:", error);
        }
    };

const handleGetFormationPlanByCode = async () => {
    try {
        const response = await api.get(`get/action_formation/${code}`);
        if (response.status === 200) {
            setPfData(response.data.data);
            console.log("response pf", response.data);
        }
    } catch (error) {
            console.log("error", error);
    }
};

const fetchUsers = async () => {
    try {
        const response = await api.get("get/liste_collaborateur");
            console.log("Participants loaded:", response.data.data); // Debug
            setParticipants(response.data.data || []); // S'assurer qu'on a un tableau
    } catch (error) {
        console.error("Erreur lors du chargement des collaborateurs:", error);
            setParticipants([]); // Fallback à un tableau vide
    }
};

useEffect(() => {
    handleGetSession();
    handleGetFormationPlanByCode();
    fetchUsers();
    _getImage();
}, [code]);

    // Fonction pour filtrer - CORRIGÉE
const filteredSessions = sessions?.filter((session) => {
    const matchesSearch =
            session?.code_session
            ?.toLowerCase()
            .includes(searchFilter.toLowerCase()) ||
            session.code_session?.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus =
        statusFilter === "all" ||
            session?.status
            ?.toLowerCase()
            .replace(" ", "")
            .includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
    }) || [];

    // Fonction pour ajouter un participant à la session - CORRIGÉE
const addParticipantToSession = (sessionId, participant) => {
        if (addSession) {
            // Pour une nouvelle session, on ajoute à selectedSession temporaire
            if (!selectedSession) {
                setSelectedSession({
                    id: 'temp',
                    participants: [participant]
                });
            } else {
    const isAlreadyParticipant = selectedSession.participants.some(
        (p) => p.matricule === participant.matricule
    );
    if (!isAlreadyParticipant) {
        setSelectedSession((prev) => ({
            ...prev,
                        participants: [...(prev.participants || []), participant],
        }));
    }
            }
        } else {
            // Pour une session existante
            const isAlreadyParticipant = selectedSession?.participants?.some(
                (p) => p.matricule === participant.matricule
            );
            
            if (!isAlreadyParticipant) {
                setSelectedSession((prev) => ({
                    ...prev,
                    participants: [...(prev.participants || []), participant],
                }));

                // Mettre à jour aussi dans la liste des sessions
    setSessions((prev) =>
        prev.map((session) => {
            if (session.id === sessionId) {
                            const isAlreadyInSession = session.participants.some(
                    (p) => p.matricule === participant.matricule
                );
                            if (!isAlreadyInSession) {
                    return {
                        ...session,
                        participants: [...session.participants, participant],
                    };
                }
            }
            return session;
        })
    );
            }
        }
    };

    // Fonction pour supprimer un participant d'une session - CORRIGÉE
const removeParticipantFromSession = (sessionId, participantIndex) => {
        setSelectedSession((prev) => {
            const newParticipants = prev.participants.filter(
                (_, index) => index !== participantIndex
            );
            return { ...prev, participants: newParticipants };
        });

        if (!addSession) {
    setSessions((prev) =>
        prev.map((session) => {
            if (session.id === sessionId) {
                const newParticipants = session.participants.filter(
                    (_, index) => index !== participantIndex
                );
                return { ...session, participants: newParticipants };
            }
            return session;
        })
    );
    }
};

const getProgressColor = (progress) => {
    if (progress >= 80) return "#10b981";
    if (progress >= 60) return "#f59e0b";
    if (progress >= 40) return "#3b82f6";
    return "#ef4444";
};

const getStatusColor = (status) => {
    switch (status) {
        case "Planifiée":
            return "#10b981";
        case "Reportée":
            return "#faaf97ff";
        case "En cours de planification":
            return "#f59e0b";
        case "Terminée":
            return "#8b5cf6";
        case null:
        default:
            return "#9ca3af";
    }
};

    // Filtrer les participants pour l'ajout - CORRIGÉE
const filteredParticipants = participants.filter((participant) => {
        if (!selectedSession && !addSession) return false;
        
        const currentParticipants = selectedSession?.participants || [];
        const alreadyAdded = currentParticipants.some(
        (p) => p.matricule === participant.matricule
    );
        
    const matchesSearch =
        participantSearch === "" ||
            participant.nom?.toLowerCase().includes(participantSearch.toLowerCase()) ||
            participant.prenom?.toLowerCase().includes(participantSearch.toLowerCase()) ||
            participant.email?.toLowerCase().includes(participantSearch.toLowerCase()) ||
            participant.matricule?.includes(participantSearch);
            
    return !alreadyAdded && matchesSearch;
});

// Vérifier si une session est active
const isSessionActive = (session) => {
    return session.start_datetime && session.end_datetime && session.status;
};

const getSessionDisplayStatus = (status) => {
    return status === null ? "En attente de validation" : status;
};

// Déterminer la couleur de la session
const getSessionColor = (session) => {
    if (
        !session?.start_datetime ||
        !session?.end_datetime ||
            session?.participants?.length === 0
    ) return "gray";
        
    switch (session.status) {
        case "Planifiée":
            return "green";
        case "Reportée":
            return "#cc3300";
        case "En cours de planification":
            return "yellow";
        case "Terminée":
            return "pink";
        default:
            return "gray";
    }
};

    // Fonction pour initialiser les données de session lors de l'édition - AJOUTÉE
    const handleEditSession = (session) => {
        setSelectedSession(session);
        setSessionData({
            startDate: session.start_datetime || moment().add(1, "day").hour(8).minute(0).format("YYYY-MM-DD HH:mm"),
            endDate: session.end_datetime || moment().add(1, "day").hour(12).minute(0).format("YYYY-MM-DD HH:mm"),
            lieu: session.location || "",
            ville: session.city || "",
            status: session.status || "",
            teacher: session.teacher || "",
        });
    };

    // Fonction pour initialiser une nouvelle session - AJOUTÉE
    const handleAddNewSession = () => {
        setAddSession(true);
        setSelectedSession({
            id: 'temp',
            participants: []
        });
        setSessionData({
            startDate: moment()
                .add(1, "day")
                .hour(8)
                .minute(0)
                .second(0)
                .millisecond(0)
                .format("YYYY-MM-DD HH:mm"),
            endDate: moment()
                .add(1, "day")
                .hour(12)
                .minute(0)
                .second(0)
                .millisecond(0)
                .format("YYYY-MM-DD HH:mm"),
            lieu: "",
            ville: "",
            status: "",
            teacher: "",
        });
    };

return (
    <Grid
        style={{
            minHeight: "100vh",
            padding: "24px",
            backgroundColor: "#f9fafb",
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
    >
        <CiblagModal
            sx={{ borderRadius: 7 }}
            open={modalCiblage}
            onClose={handleCloseModalCiblag}
                code={code} 
            />
            
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
            
        <Grid style={{ maxWidth: "1700px", margin: "0 auto" }}>
            {/* Header */}
            <Grid
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "32px",
                }}
            >
                <Grid style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <Button
                        onClick={(e) => navigate(`/formation-plan`, { replace: true })}
                    >
                        <ArrowLeft
                            size={24}
                            color="#6b7280"
                                style={{ cursor: "pointer" }} 
                            />
                    </Button>
                    <h1
                        style={{
                            fontSize: "28px",
                            fontWeight: "600",
                            color: "#111827",
                            margin: 0,
                        }}
                    >
                        Configuration de l'action de formation
                    </h1>
                </Grid>
                <Grid style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span
                        style={{
                            padding: "6px 12px",
                            backgroundColor: "#e5e7eb",
                            color: "#6b7280",
                            borderRadius: "20px",
                            fontSize: "14px",
                        }}
                    >
                        Pending
                    </span>
                    <span style={{ color: "#6b7280", fontSize: "16px" }}>
                        March, 2024
                    </span>
                </Grid>
                </Grid>

                {/* Main Grid - 2 Columns */}
            <Grid
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px",
                    marginBottom: "24px",
                }}
            >
                {/* Left Column */}
                <Grid
                    style={{ display: "flex", flexDirection: "column", gap: "24px" }}
                >
                    {/* composant pour les details de l'action de formation */}
                    <CardInfoAction
                        title={pfData && pfData.title}
                        fullTitle={pfData && pfData.title}
                        code={pfData.code_formation}
                        img={imgPic}
                    />
                    {/* Formulaire Chaud */}
                    <Grid
                        style={{
                            background: "white",
                            borderRadius: "12px",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                            overflow: "hidden",
                        }}
                        >
                            <ColdForm />
                    </Grid>
                </Grid>

                {/* Right Column */}
                <Grid
                    style={{ display: "flex", flexDirection: "column", gap: "24px" }}
                >
                        {/* Sessions de formation */}
                    <Grid
                        style={{
                            background: "white",
                            borderRadius: "12px",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                            overflow: "hidden",
                        }}
                    >
                        <Grid style={{ padding: "24px 24px 16px" }}>
                            <Grid
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "16px",
                                }}
                            >
                                <h3
                                    style={{
                                            fontSize: "18px", 
                                            fontWeight: "600",
                                        color: "#111827",
                                        margin: 0,
                                    }}
                                >
                                    Session de formation
                                </h3>
                            </Grid>
                                
                            {/* Barre de recherche et filtres */}
                            <div
                                style={{ display: "flex", gap: "12px", marginBottom: "16px" }}
                            >
                                <div style={{ flex: 1, position: "relative" }}>
                                    <Search
                                        size={16}
                                        color="#6b7280"
                                        style={{
                                            position: "absolute",
                                            left: "12px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Rechercher des session..."
                                        value={searchFilter}
                                        onChange={(e) => setSearchFilter(e.target.value)}
                                        style={{
                                                width: "100%", 
                                                padding: "8px 12px 8px 36px",
                                            border: "1px solid #d1d5db",
                                            borderRadius: "8px",
                                            fontSize: "14px",
                                            backgroundColor: "#f9fafb",
                                        }}
                                    />
                                </div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    style={{
                                        padding: "8px 12px",
                                        border: "1px solid #d1d5db",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        backgroundColor: "#f9fafb",
                                        minWidth: "20px",
                                        }}
                                    >
                                    <option value="all">Toutes les session</option>
                                    <option value="Reportée">Reportée</option>
                                    <option value="En cours de planification">
                                        En cours de planification
                                    </option>
                                    <option value="Terminée">Terminée</option>
                                    <option value="Planifiée">Planifiée</option>
                                </select>
                                <button
                                        onClick={handleAddNewSession}
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: "#10b981",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        transition: "background-color 0.2s",
                                        whiteSpace: "nowrap",
                                    }}
                                    onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = "#059669";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "#10b981";
                                    }}
                                    title="Créer une nouvelle session"
                                >
                                    <Plus size={16} />
                                    Ajouter
                                </button>
                                <button
                                    onClick={handleOpenModalCiblag}
                                    style={{
                                        padding: "8px 16px",
                                            backgroundColor: "#000000ff", 
                                            color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        transition: "background-color 0.2s",
                                        whiteSpace: "nowrap",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#5c0079ff";
                                    }}
                                    onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = "#000000ff";
                                    }}
                                        title="Ciblage des participants"
                                >
                                    <Users size={16} />
                                    Ciblage
                                </button>
                            </div>
                        </Grid>
                            
                        <Grid
                            style={{
                                padding: "0 24px 24px",
                                maxHeight: "600px",
                                overflowY: "auto",
                                }}
                            >
                            <Grid
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: "16px",
                                }}
                            >
                                {filteredSessions.map((session) => {
                                    const sessionColor = getSessionColor(session);
                                    const active = isSessionActive(session);
                                        
                                    return (
                                        <Grid
                                            key={session.id}
                                                onClick={() => handleEditSession(session)}
                                            style={{
                                                padding: "16px",
                                                borderRadius: "12px",
                                                border: "1px solid",
                                                backgroundColor:
                                                    sessionColor === "yellow"
                                                        ? "#fefce8"
                                                        : sessionColor === "blue"
                                                            ? "#eff6ff"
                                                            : sessionColor === "pink"
                                                                ? "#fdf2f8"
                                                                : sessionColor === "green"
                                                                    ? "#f0fdf4"
                                                                        : "#f9fafb", 
                                                    borderColor:
                                                    sessionColor === "yellow"
                                                        ? "#fde047"
                                                        : sessionColor === "blue"
                                                            ? "#93c5fd"
                                                            : sessionColor === "pink"
                                                                ? "#f9a8d4"
                                                                : sessionColor === "green"
                                                                    ? "#86efac"
                                                                    : "#d1d5db",
                                                cursor: "pointer",
                                                transition: "all 0.3s ease",
                                                position: "relative",
                                                opacity: active ? 1 : 0.8,
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-4px)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 8px 25px rgba(0,0,0,0.15)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0)";
                                                e.currentTarget.style.boxShadow = "none";
                                            }}
                                        >
                                            {!isSessionActive(session) && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: "8px",
                                                            right: "8px", 
                                                            width: "20px",
                                                        height: "20px",
                                                        backgroundColor: "#ef4444",
                                                        borderRadius: "50%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "10px",
                                                        color: "white",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                        !
                                                </div>
                                            )}
                                                
                                            <Grid
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    marginBottom: "8px",
                                                }}
                                            >
                                                <span style={{ fontSize: "11px", color: "#6b7280" }}>
                                                    {session.start_datetime}
                                                </span>
                                            </Grid>
                                                
                                            <h4
                                                style={{
                                                    fontWeight: "600",
                                                        color: "#111827", 
                                                        margin: "0 0 6px 0",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {session.code_session}
                                            </h4>
                                                
                                            <Grid
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    marginBottom: "8px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: "11px",
                                                        color: getStatusColor(session.status),
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {getSessionDisplayStatus(session.status)}
                                                </span>
                                            </Grid>

                                            <Grid style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}>
                                            <Grid style={{ display: "flex" }}>
                                                {session.participants
                                                    .slice(0, 2)
                                                    .map((member, index) => (
                                                        <Grid
                                                            key={index}
                                                            style={{
                                                                width: "20px",
                                                                height: "20px",
                                                                borderRadius: "50%",
                                                                border: "2px solid white",
                                                                marginLeft: index > 0 ? "-4px" : "0",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontSize: "8px",
                                                                backgroundColor:
                                                                    index === 0 ? "#fb923c" : "#60a5fa",
                                                                zIndex: session.participants.length - index,
                                                                        color: "white",
                                                            }}
                                                        >
                                                            {getInitial(member.prenom, member.nom)}
                                                        </Grid>
                                                            ))}
                                                        
                                                        {session.participants.length > 2 && (
                                                            <Grid
                                                        style={{
                                                            width: "20px",
                                                            height: "20px",
                                                            borderRadius: "50%",
                                                            border: "2px solid white",
                                                            marginLeft: "-4px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            fontSize: "8px",
                                                            backgroundColor: "#e5e7eb",
                                                            color: "#6b7280",
                                                        }}
                                                            > 
                                                                +{session.participants.length - 2}
                                                </Grid>
                                                        )}
                                            </Grid>
                                                    
                                            <span
                                                style={{
                                                    padding: "2px 6px",
                                                    borderRadius: "6px",
                                                    fontSize: "9px",
                                                    fontWeight: "500",
                                                    backgroundColor:
                                                                sessionColor === "yellow"
                                                            ? "#fef3c7"
                                                                    : sessionColor === "blue"
                                                                ? "#dbeafe"
                                                                        : sessionColor === "pink"
                                                                            ? "#fce7f3" 
                                                                            : sessionColor === "green"
                                                                        ? "#dcfce7"
                                                                        : "#f3e8ff",
                                                    color:
                                                                sessionColor === "yellow"
                                                            ? "#92400e"
                                                                    : sessionColor === "blue"
                                                                ? "#1e40af"
                                                                        : sessionColor === "pink"
                                                                    ? "#be185d"
                                                                            : sessionColor === "green"
                                                                        ? "#166534"
                                                                        : "#7c3aed",
                                                }}
                                            >
                                                        {session.participants.length} participants
                                            </span>
                                        </Grid>
</Grid>
                            );
})}
                        </Grid>
                                
                        {filteredSessions.length === 0 && (
                            <Grid
                                style={{
                                    textAlign: "center",
                                    padding: "40px 20px",
                                    color: "#6b7280",
                                }}
                                    >
                                        <Search
                                    size={48}
                                    color="#d1d5db"
                                    style={{ marginBottom: "16px" }}
                                />
                                <p style={{ margin: 0, fontSize: "16px" }}>
                                    Aucune session de formation trouvée
                                </p>
                                <p style={{ margin: "8px 0 0 0", fontSize: "14px" }}>
                                    Essayez de modifier vos critères de recherche
                                </p>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

                {/* Session Details Modal */}
        {(selectedSession || addSession) && (
            <Grid
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    display: "flex",
                    alignItems: "center",
                            justifyContent: "center", 
                            zIndex: 1000,
                    padding: "20px",
                }}
                onClick={closeModal}
            >
                <Grid
                    style={{
                        background: "white",
                        borderRadius: "16px",
                        maxWidth: "1000px",
                        width: "100%",
                                maxHeight: "90vh",
                        overflow: "hidden",
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <Grid
                        style={{
                            padding: "24px 24px 16px",
                            borderBottom: "1px solid #e5e7eb",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Grid
                            style={{ display: "flex", alignItems: "center", gap: "12px" }}
                        >
                                    <Grid
                                        style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "8px",
                                backgroundColor:
                                                getSessionColor(selectedSession) === "yellow"
                                        ? "#fefce8"
                                        : getSessionColor(selectedSession) === "blue"
                                            ? "#eff6ff"
                                            : getSessionColor(selectedSession) === "pink"
                                                ? "#fdf2f8"
                                                : getSessionColor(selectedSession) === "green"
                                                    ? "#f0fdf4"
                                                    : "#f9fafb",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px",
                            }}
>
                                        📚
                        </Grid>
                        <Grid>
                            <h2
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "600",
                                    color: "#111827",
                                    margin: "0 0 4px 0",
                                }}
                                        >
                                            {addSession
                                ? "Créer une nouvelle session"
                                : selectedSession?.code_session}
                            </h2>
                            <p
                                style={{
                                    fontSize: "14px",
                                    color: "#6b7280",
                                    margin: 0,
                                }}
                            >
                                {addSession
                                    ? "Remplissez les informations ci-dessous"
                                    : selectedSession?.date}
                            </p>
                        </Grid>
                    </Grid>
                    <button
                        onClick={closeModal}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "8px",
                            borderRadius: "8px",
                            color: "#6b7280",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f3f4f6";
                                    }} 
                                    onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                        }}
                    >
                        <X size={20} />
                    </button>
                </Grid>

                {/* Modal Content */}
                <Grid
                    style={{
                        padding: "24px",
                        overflowY: "auto",
                        maxHeight: "calc(90vh - 120px)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                    }}
                >
                                {/* Session Description */}
                    <Grid style={{ marginBottom: "24px" }}>
                        <h3
                            style={{
                                fontSize: "16px",
                                fontWeight: "600",
                                color: "#111827",
                                margin: "0 0 12px 0",
                            }}
                        >
                            Détails de la session
                                    </h3>
                                    <p
                            style={{
                                fontSize: "14px",
                                color: "#6b7280",
                                lineHeight: "1.6",
                                margin: 0,
                            }}
                        >
                                        {selectedSession?.description || "Configurez les informations de cette session de formation."}
                        </p>
                    </Grid>

                                {/* Session Details Grid */}
                    <Grid>
                        <Grid
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "16px",
                                marginBottom: "16px",
                            }}
                        >
                            {/* Date de début */}
                            <Grid style={{ position: "relative" }}>
                                <label
                                    style={{
                                        display: "block",
                                        fontSize: "12px",
                                        color: "#6b7280",
                                        marginBottom: "6px",
                                                    textTransform: "uppercase", 
                                                    fontWeight: "500",
                                    }}
                                >
                                    <Clock
                                        size={14}
                                        style={{ display: "inline", marginRight: "4px" }}
                                    />
                                    Date de début
                                </label>
                                <DateTimePicker
                                    onChange={(e) =>
                                        setSessionData((prev) => ({
                                            ...prev,
                                            startDate: moment(e.date).format(
                                                "YYYY-MM-DD HH:mm"
                                            ),
                                        }))
                                    }
                                    sideBySide
                                    date={moment(sessionData.startDate)}
                                    format="DD/MM/YYYY HH:mm"
                                    locale="fr-FR"
                                    enabledHours={[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
                                />
                            </Grid>
                                        
                            <Grid>
                                <label
                                    style={{
                                        display: "block",
                                                    fontSize: "12px", 
                                                    color: "#6b7280",
                                        marginBottom: "6px",
                                        textTransform: "uppercase",
                                        fontWeight: "500",
                                    }}
                                >
                                    <Clock
                                        size={14}
                                        style={{ display: "inline", marginRight: "4px" }}
                                    />
                                    Date de fin
                                </label>
                                <DateTimePicker
                                    onChange={(e) =>
                                        setSessionData((prev) => ({
                                            ...prev,
                                            endDate: moment(e.date).format("YYYY-MM-DD HH:mm"),
                                        }))
                                    }
                                    sideBySide
                                    date={moment(sessionData.endDate)}
                                    format="DD/MM/YYYY HH:mm"
                                    locale="fr-FR"
                                    enabledHours={[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
                                />
                            </Grid>
                                        
                            {/* Lieu */}
                            <Grid>
                                <label
                                    style={{
                                        display: "block",
                                        fontSize: "12px",
                                        color: "#6b7280",
                                        marginBottom: "6px",
                                        textTransform: "uppercase",
                                        fontWeight: "500",
                                    }}
                                >
                                    <MapPin
                                        size={14}
                                        style={{ display: "inline", marginRight: "4px" }}
                                    />
                                    Lieu
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: Salle de conférence A"
                                    value={sessionData.lieu}
                                    onChange={(e) =>
                                        setSessionData((prev) => ({
                                            ...prev,
                                            lieu: e.target.value,
                                        }))
                                    }
                                    style={{
                                        width: "100%",
                                        padding: "10px 12px",
                                        border: "1px solid #d1d5db",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        backgroundColor: "#fff",
                                    }}
                                />
                            </Grid>
                                        
                            {/* Ville */}
                            <Grid>
                                <label
                                    style={{
                                        display: "block",
                                        fontSize: "12px",
                                        color: "#6b7280",
                                        marginBottom: "6px",
                                        textTransform: "uppercase",
                                        fontWeight: "500",
                                    }}
                                >
                                    <Building
                                        size={14}
                                        style={{ display: "inline", marginRight: "4px" }}
                                    />
                                    Ville
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: Abidjan"
                                    value={sessionData.ville}
                                    onChange={(e) =>
                                        setSessionData((prev) => ({
                                            ...prev,
                                            ville: e.target.value,
                                                    }))
                                                }
                                    style={{
                                        width: "100%",
                                        padding: "10px 12px",
                                        border: "1px solid #d1d5db",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        backgroundColor: "#fff",
                                    }}
                                />
                            </Grid>
                                        
                                        {/* Formateur */}
                            <Grid>
                                <label
                                    style={{
                                        display: "block",
                                        fontSize: "12px",
                                        color: "#6b7280",
                                        marginBottom: "6px",
                                        textTransform: "uppercase",
                                        fontWeight: "500",
                                    }}
                                >
                                                <Users
                                        size={14}
                                        style={{ display: "inline", marginRight: "4px" }}
                                    />
                                    Formateur
                                </label>
                                            <input
                                                type="text"
                                                placeholder="ex: MANFAILY...."
                                value={sessionData.teacher}
                                onChange={(e) =>
                                    setSessionData((prev) => ({
                                        ...prev,
                                        teacher: e.target.value,
                                    }))
                                }
                                style={{
                                    width: "100%",
                                    padding: "10px 12px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    backgroundColor: "#fff",
                                }}
/>
                            </Grid>
                                        
                                        {/* Status - Affiché seulement si conditions remplies */}
                                        {((selectedSession?.participants?.length > 0 || (addSession && selectedSession?.participants?.length > 0)) &&
                                sessionData?.startDate &&
                                            sessionData?.endDate) && (
                                    <Grid>
                                        <label
                                            style={{
                                                display: "block",
                                                fontSize: "12px",
                                                color: "#6b7280",
                                                        marginBottom: "6px", 
                                                        textTransform: "uppercase",
                                                fontWeight: "500",
                                            }}
                                        >
                                            <CheckCircle
                                                size={14}
                                                style={{ display: "inline", marginRight: "4px" }}
                                            />
                                            Statut de la session
                                        </label>
                                        <select
                                            value={sessionData.status}
                                            onChange={(e) =>
                                                setSessionData((prev) => ({
                                                    ...prev,
                                                    status: e.target.value,
                                                }))
                                            }
                                            style={{
                                                        width: "100%",
                                                padding: "10px 12px",
                                                border: "1px solid #d1d5db",
                                                borderRadius: "8px",
                                                fontSize: "14px",
                                                backgroundColor: "#fff",
                                            }}
                                        >
                                            <option value="">Sélectionner un statut</option>
                                            {_status.map((option) => (
                                                <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                            ))}
                                        </select>
                                    </Grid>
                                )}
                        </Grid>
                    </Grid>

                                {/* Participants Section */}
                    <Grid>
                        <Grid
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "16px",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    color: "#111827",
                                    margin: 0,
                                }}
                            >
                                            Total participants ({selectedSession?.participants?.length || 0})
                            </h3>
                            <div style={{ display: "flex", gap: "8px" }}>
                                <Button
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: "#10b981",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "6px",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                    }}
                                    startIcon={<CloudUploadIcon />}
                                >
                                                Charger des participants
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={(event) => console.log(event.target.files)}
                                        multiple
                                    />
                                </Button>
                                <button
                                    onClick={() => setShowAddMember(!showAddMember)}
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: "#3b82f6",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "6px",
                                        fontSize: "12px",
                                                    fontWeight: "500", 
                                                    cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                    }}
                                >
                                    <Plus size={14} />
                                    Ajouter
                                </button>
                            </div>
                        </Grid>

                        {/* Add Participant Form */}
                        {showAddMember && (
                            <Grid
                                style={{
                                    padding: "16px",
                                    backgroundColor: "#f0f9ff",
                                    borderRadius: "8px",
                                    marginBottom: "16px",
                                    border: "1px solid #bae6fd",
                                }}
                            >
                                <h4
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#111827",
                                        margin: "0 0 12px 0",
                                    }}
                                            >
                                                Ajouter un participant
                                </h4>
                                            
                                {/* Barre de recherche pour participants */}
                                <div style={{ marginBottom: "12px" }}>
                                    <div style={{ position: "relative" }}>
                                        <Search
                                            size={16}
                                            color="#6b7280"
                                            style={{
                                                position: "absolute",
                                                left: "12px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Rechercher par nom, prénom, email ou matricule..."
                                            value={participantSearch}
                                            onChange={(e) =>
                                                setParticipantSearch(e.target.value)
                                            }
                                            style={{
                                                width: "100%",
                                                padding: "8px 12px 8px 36px",
                                                border: "1px solid #d1d5db",
                                                borderRadius: "6px",
                                                fontSize: "12px",
                                                backgroundColor: "white",
                                            }}
                                                    />
                                </div>
                                            </div>
                                            
                                {/* Liste des participants disponibles */}
                                <div
                                    style={{
                                        maxHeight: "200px",
                                        overflowY: "auto",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "6px",
                                        backgroundColor: "white",
                                    }}
                                >
                                    {filteredParticipants
                                        .slice(
                                            0,
                                            showAllParticipants
                                                ? filteredParticipants.length
                                                : 10
                                        )
                                        .map((participant, index) => (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    addParticipantToSession(
                                                        selectedSession.id,
                                                        participant
                                                    );
                                                    setParticipantSearch("");
                                                }}
                                                style={{
                                                    padding: "8px 12px",
                                                    borderBottom:
                                                                    index < filteredParticipants.slice(
                                                                        0,
                                                                        showAllParticipants
                                                                            ? filteredParticipants.length
                                                                            : 10
                                                                    ).length - 1
                                                            ? "1px solid #f3f4f6"
                                                            : "none",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                    transition: "background-color 0.2s",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor =
                                                        "#f9fafb";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = "white";
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "24px",
                                                        height: "24px",
                                                        borderRadius: "50%",
                                                        backgroundColor: "#3b82f6",
                                                        color: "white",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "10px",
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {getInitial(
                                                        participant.nom,
                                                        participant.prenom
                                                    )}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div
                                                        style={{
                                                            fontSize: "12px",
                                                            fontWeight: "500",
                                                            color: "#111827",
                                                        }}
                                                    >
                                                        {participant.nom} {participant.prenom}
                                                    </div>
                                                    <div
                                                        style={{ fontSize: "10px", color: "#6b7280" }}
                                                    >
                                                        {participant.email} • {participant.fonction}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                                
                                    {filteredParticipants.length > 10 &&
                                        !showAllParticipants && (
                                            <div
                                                onClick={() => setShowAllParticipants(true)}
                                                style={{
                                                    padding: "8px 12px",
                                                    textAlign: "center",
                                                    cursor: "pointer",
                                                    backgroundColor: "#f9fafb",
                                                    fontSize: "12px",
                                                    color: "#3b82f6",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                <ChevronDown
                                                    size={14}
                                                    style={{
                                                        display: "inline",
                                                        marginRight: "4px",
                                                    }}
                                                />
                                                            Voir {filteredParticipants.length - 10}{" "}
                                                participants de plus
                                            </div>
                                        )}
                                                
                                    {showAllParticipants &&
                                        filteredParticipants.length > 10 && (
                                            <div
                                                onClick={() => setShowAllParticipants(false)}
                                                style={{
                                                    padding: "8px 12px",
                                                    textAlign: "center",
                                                    cursor: "pointer",
                                                    backgroundColor: "#f9fafb",
                                                                fontSize: "12px", 
                                                                color: "#3b82f6",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                <ChevronUp
                                                    size={14}
                                                    style={{
                                                        display: "inline",
                                                        marginRight: "4px",
                                                    }}
                                                />
                                                Réduire la liste
                                            </div>
                                        )}
                                                
                                    {filteredParticipants.length === 0 && (
                                        <div
                                            style={{
                                                padding: "20px",
                                                textAlign: "center",
                                                color: "#6b7280",
                                                fontSize: "12px",
                                            }}
                                        >
                                            Aucun participant trouvé
                                        </div>
                                    )}
                                </div>
                                            
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "8px",
                                        marginTop: "12px",
                                    }}
                                >
                                    <button
                                        onClick={() => {
                                            setShowAddMember(false);
                                            setParticipantSearch("");
                                            setShowAllParticipants(false);
                                        }}
                                        style={{
                                            padding: "6px 12px",
                                            backgroundColor: "#f3f4f6",
                                            color: "#6b7280",
                                            border: "none",
                                            borderRadius: "4px",
                                            fontSize: "12px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </Grid>
                        )}

                                    {/* Liste des participants actuels */}
                        <div
                            style={{
                                display: "flex",
                                            flexDirection: "column", 
                                            gap: "8px",
                                maxHeight: "300px",
                                overflowY: "auto",
                            }}
                        >
                            {selectedSession?.participants?.map(
                                (participant, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "12px",
                                            padding: "12px",
                                            backgroundColor: "#f9fafb",
                                            borderRadius: "8px",
                                            border: "1px solid #e5e7eb",
                                                    }} 
                                                >
                                        <div
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                backgroundColor:
                                                    index % 4 === 0 ? "#fb923c"
                                                        : index % 4 === 1
                                                            ? "#60a5fa"
                                                            : index % 4 === 2
                                                                ? "#34d399"
                                                                : "#f59e0b",
                                                color: "white",
                                            }}
                                        >
                                            {getInitial(participant.nom, participant.prenom)}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p
                                                style={{
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    color: "#111827",
                                                    margin: "0 0 2px 0",
                                                }}
                                            >
                                                {participant.nom} {participant.prenom}
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: "11px",
                                                    color: "#6b7280",
                                                    margin: "0 0 1px 0",
                                                }}
                                            >
                                                {participant.email}
                                                        </p>
                                                        <p
                                                style={{
                                                    fontSize: "10px",
                                                    color: "#9ca3af",
                                                    margin: 0,
                                                }}
                                            >
                                                Matricule: {participant.matricule}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                removeParticipantFromSession(
                                                    selectedSession.id,
                                                    index
                                                )
                                            }
                                            style={{
                                                padding: "6px",
                                                backgroundColor: "#fef2f2",
                                                color: "#dc2626",
                                                border: "1px solid #fecaca",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            title="Supprimer ce participant"
                                        >
                                                        <Trash2 size={12} />
                                                    </button>
                                    </div>
                                )
                            )}
                        </div>
                                    
                                    {(!selectedSession?.participants || selectedSession.participants.length === 0) && (
                            <Grid
                                style={{
                                    textAlign: "center",
                                    padding: "32px 16px",
                                    color: "#6b7280",
                                }}
                            >
                                <Users
                                    size={32}
                                    color="#d1d5db"
                                    style={{ marginBottom: "12px" }}
                                />
                                <p style={{ margin: 0, fontSize: "14px" }}>
                                                Aucun participant assigné
                                </p>
                                <p style={{ margin: "4px 0 0 0", fontSize: "12px" }}>
                                                Cliquez sur "Ajouter" pour assigner des participants à cette session
                                </p>
                            </Grid>
                        )}
                    </Grid>

                    {/* Action Buttons */}
                    <div style={{
                        borderTop: "1px solid #e5e7eb",
                        paddingTop: "16px",
                        display: "flex",
                        gap: "12px",
                        justifyContent: "space-between",
                    }}>
                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                        <DialogContent>
                            Êtes-vous sûr de vouloir supprimer cette session ?
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={handleConfirmDelete} color="primary">
                                Confirmer
                            </Button>
                        </DialogActions>
                    </Dialog>
                                    
                    {!addSession && (
                        <button
                            onClick={handleDeleteClick}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#dc2626",
                                color: "white",
                                border: "none",
                                                borderRadius: "8px", 
                                                fontSize: "14px",
                                fontWeight: "500",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                transition: "background-color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#b91c1c";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#dc2626";
                            }}
                        >
                            <Trash2 size={14} />
                            Supprimer
                        </button>
                    )}
                                    
                    {addSession && <div></div>}
                                    
                    <div style={{ display: "flex", gap: "12px" }}>
                        <button
                                            onClick={closeModal}
                            style={{
                                padding: "10px 20px",
                                                backgroundColor: "#f3f4f6", 
                                                color: "#6b7280",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "500",
                                cursor: "pointer",
                            }}
                        >
                            Annuler
                        </button>
                        <button
                            onClick={addSession ? createSession : saveSession}
                            disabled={saving}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: saving ? "#9ca3af" : "#3b82f6",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "500",
                                cursor: saving ? "not-allowed" : "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                                opacity: saving ? 0.7 : 1,
                            }}
                        >
                            {saving ? (
                                <>
                                    <div
                                        style={{
                                            width: "14px",
                                            height: "14px",
                                            border: "2px solid transparent",
                                            borderTop: "2px solid white",
                                            borderRadius: "50%",
                                            animation: "spin 1s linear infinite",
                                        }}
                                    ></div>
                                                    {addSession ? "Création..." : "Enregistrement..."}
                                </>
                            ) : (
                                <>
                                    <Save size={14} />
                                    Enregistrer
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </Grid>
</Grid>
</Grid>
)}
            </Grid>
            
    <style>{`
::-webkit-scrollbar {
width: 6px;
}
                ::-webkit-scrollbar-track {
                    background: #f1f5f9;
border-radius: 3px;
}
::-webkit-scrollbar-thumb {
background: #cbd5e1;
border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
background: #94a3b8;
}
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
`}</style>
        </Grid>
);
};

export default ProfileDashboard;