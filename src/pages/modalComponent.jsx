import React, { useState, useEffect } from "react";
import {
    X,
    Save,
    Trash2,
    Clock,
    MapPin,
    Building,
    Users,
    CheckCircle,
    Plus,
    Search,
    ChevronDown,
    ChevronUp,
    UserCheck,
    UserX,
    Star,
    MessageSquare,
    Info,
    ClipboardList
} from "lucide-react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DateTimePicker } from "react-tempusdominus-bootstrap";
import moment from "moment";
import { Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import getInitial from "../utils/getInitial";

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

const SessionModal = ({
    isOpen,
    onClose,
    selectedSession,
    addSession,
    sessionData,
    setSessionData,
    participants,
    onSaveSession,
    onCreateSession,
    onDeleteSession,
    saving,
    _status
}) => {
    const [activeTab, setActiveTab] = useState("general");
    const [showAddMember, setShowAddMember] = useState(false);
    const [participantSearch, setParticipantSearch] = useState("");
    const [showAllParticipants, setShowAllParticipants] = useState(false);
    const [presenceData, setPresenceData] = useState({});
    const [evaluationData, setEvaluationData] = useState({});
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [localSelectedSession, setLocalSelectedSession] = useState(selectedSession);

    // Synchroniser localSelectedSession avec selectedSession
    useEffect(() => {
        setLocalSelectedSession(selectedSession);
        
        // Initialiser les données de présence et d'évaluation
        if (selectedSession?.participants) {
            const initialPresence = {};
            const initialEvaluation = {};
            
            selectedSession.participants.forEach(participant => {
                initialPresence[participant.matricule] = false;
                initialEvaluation[participant.matricule] = {
                    satisfaction: 0,
                    contenu: 0,
                    formateur: 0,
                    commentaires: ""
                };
            });
            
            setPresenceData(initialPresence);
            setEvaluationData(initialEvaluation);
        }
    }, [selectedSession]);

    // Reset lors de la fermeture
    useEffect(() => {
        if (!isOpen) {
            setActiveTab("general");
            setShowAddMember(false);
            setParticipantSearch("");
            setShowAllParticipants(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setShowAddMember(false);
        setParticipantSearch("");
        setShowAllParticipants(false);
        setActiveTab("general");
        onClose();
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        onDeleteSession(selectedSession?.code_session);
        setDeleteDialogOpen(false);
    };

    // Fonctions pour gérer la présence
    const togglePresence = (participantId, isPresent) => {
        setPresenceData(prev => ({
            ...prev,
            [participantId]: isPresent
        }));
    };

    // Fonctions pour gérer l'évaluation
    const updateEvaluation = (participantId, field, value) => {
        setEvaluationData(prev => ({
            ...prev,
            [participantId]: {
                ...prev[participantId],
                [field]: value
            }
        }));
    };

    // Ajouter un participant à la session
    const addParticipantToSession = (participant) => {
        const isAlreadyParticipant = localSelectedSession?.participants?.some(
            (p) => p.matricule === participant.matricule
        );
        
        if (!isAlreadyParticipant) {
            setLocalSelectedSession((prev) => ({
                ...prev,
                participants: [...(prev.participants || []), participant],
            }));
        }
    };

    // Supprimer un participant d'une session
    const removeParticipantFromSession = (participantIndex) => {
        setLocalSelectedSession((prev) => {
            const newParticipants = prev.participants.filter(
                (_, index) => index !== participantIndex
            );
            return { ...prev, participants: newParticipants };
        });
    };

    // Filtrer les participants pour l'ajout
    const filteredParticipants = participants.filter((participant) => {
        const currentParticipants = localSelectedSession?.participants || [];
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

    const getSessionColor = (session) => {
        if (!session?.start_datetime || !session?.end_datetime || session?.participants?.length === 0) 
            return "gray";

        switch (session.status) {
            case "Planifiée": return "green";
            case "Reportée": return "#cc3300";
            case "En cours de planification": return "yellow";
            case "Terminée": return "pink";
            default: return "gray";
        }
    };

    // Contenu de l'onglet Informations générales
    const renderGeneralTab = () => (
        <>
            {/* Session Description */}
            <Grid style={{ marginBottom: "24px" }}>
                <h3 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0 0 12px 0",
                }}>
                    Détails de la session
                </h3>
                <p style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    lineHeight: "1.6",
                    margin: 0,
                }}>
                    {selectedSession?.description || "Configurez les informations de cette session de formation."}
                </p>
            </Grid>

            {/* Session Details Grid */}
            <Grid>
                <Grid style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "16px",
                    marginBottom: "16px",
                }}>
                    {/* Date de début */}
                    <Grid style={{ position: "relative" }}>
                        <label style={{
                            display: "block",
                            fontSize: "12px",
                            color: "#6b7280",
                            marginBottom: "6px",
                            textTransform: "uppercase",
                            fontWeight: "500",
                        }}>
                            <Clock size={14} style={{ display: "inline", marginRight: "4px" }} />
                            Date de début
                        </label>
                        <DateTimePicker
                            onChange={(e) =>
                                setSessionData((prev) => ({
                                    ...prev,
                                    startDate: moment(e.date).format("YYYY-MM-DD HH:mm"),
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
                        <label style={{
                            display: "block",
                            fontSize: "12px",
                            color: "#6b7280",
                            marginBottom: "6px",
                            textTransform: "uppercase",
                            fontWeight: "500",
                        }}>
                            <Clock size={14} style={{ display: "inline", marginRight: "4px" }} />
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
                        <label style={{
                            display: "block",
                            fontSize: "12px",
                            color: "#6b7280",
                            marginBottom: "6px",
                            textTransform: "uppercase",
                            fontWeight: "500",
                        }}>
                            <MapPin size={14} style={{ display: "inline", marginRight: "4px" }} />
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
                        <label style={{
                            display: "block",
                            fontSize: "12px",
                            color: "#6b7280",
                            marginBottom: "6px",
                            textTransform: "uppercase",
                            fontWeight: "500",
                        }}>
                            <Building size={14} style={{ display: "inline", marginRight: "4px" }} />
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
                        <label style={{
                            display: "block",
                            fontSize: "12px",
                            color: "#6b7280",
                            marginBottom: "6px",
                            textTransform: "uppercase",
                            fontWeight: "500",
                        }}>
                            <Users size={14} style={{ display: "inline", marginRight: "4px" }} />
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

                    {/* Status */}
                    {((localSelectedSession?.participants?.length > 0) &&
                        sessionData?.startDate &&
                        sessionData?.endDate) && (
                            <Grid>
                                <label style={{
                                    display: "block",
                                    fontSize: "12px",
                                    color: "#6b7280",
                                    marginBottom: "6px",
                                    textTransform: "uppercase",
                                    fontWeight: "500",
                                }}>
                                    <CheckCircle size={14} style={{ display: "inline", marginRight: "4px" }} />
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
                <Grid style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                }}>
                    <h3 style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#111827",
                        margin: 0,
                    }}>
                        Total participants ({localSelectedSession?.participants?.length || 0})
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
                    <Grid style={{
                        padding: "16px",
                        backgroundColor: "#f0f9ff",
                        borderRadius: "8px",
                        marginBottom: "16px",
                        border: "1px solid #bae6fd",
                    }}>
                        <h4 style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#111827",
                            margin: "0 0 12px 0",
                        }}>
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
                                    onChange={(e) => setParticipantSearch(e.target.value)}
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
                        <div style={{
                            maxHeight: "200px",
                            overflowY: "auto",
                            border: "1px solid #e5e7eb",
                            borderRadius: "6px",
                            backgroundColor: "white",
                        }}>
                            {filteredParticipants
                                .slice(0, showAllParticipants ? filteredParticipants.length : 10)
                                .map((participant, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            addParticipantToSession(participant);
                                            setParticipantSearch("");
                                        }}
                                        style={{
                                            padding: "8px 12px",
                                            borderBottom: index < filteredParticipants.slice(
                                                0,
                                                showAllParticipants ? filteredParticipants.length : 10
                                            ).length - 1 ? "1px solid #f3f4f6" : "none",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            transition: "background-color 0.2s",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = "#f9fafb";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = "white";
                                        }}
                                    >
                                        <div style={{
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
                                        }}>
                                            {getInitial(participant.nom, participant.prenom)}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{
                                                fontSize: "12px",
                                                fontWeight: "500",
                                                color: "#111827",
                                            }}>
                                                {participant.nom} {participant.prenom}
                                            </div>
                                            <div style={{ fontSize: "10px", color: "#6b7280" }}>
                                                {participant.email} • {participant.fonction}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            {filteredParticipants.length > 10 && !showAllParticipants && (
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
                                    <ChevronDown size={14} style={{ display: "inline", marginRight: "4px" }} />
                                    Voir {filteredParticipants.length - 10} participants de plus
                                </div>
                            )}

                            {showAllParticipants && filteredParticipants.length > 10 && (
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
                                    <ChevronUp size={14} style={{ display: "inline", marginRight: "4px" }} />
                                    Réduire la liste
                                </div>
                            )}

                            {filteredParticipants.length === 0 && (
                                <div style={{
                                    padding: "20px",
                                    textAlign: "center",
                                    color: "#6b7280",
                                    fontSize: "12px",
                                }}>
                                    Aucun participant trouvé
                                </div>
                            )}
                        </div>

                        <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
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
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    maxHeight: "300px",
                    overflowY: "auto",
                }}>
                    {localSelectedSession?.participants?.map((participant, index) => (
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
                            <div style={{
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
                                        : index % 4 === 1 ? "#60a5fa"
                                            : index % 4 === 2 ? "#34d399" : "#f59e0b",
                                color: "white",
                            }}>
                                {getInitial(participant.nom, participant.prenom)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    color: "#111827",
                                    margin: "0 0 2px 0",
                                }}>
                                    {participant.nom} {participant.prenom}
                                </p>
                                <p style={{
                                    fontSize: "11px",
                                    color: "#6b7280",
                                    margin: "0 0 1px 0",
                                }}>
                                    {participant.email}
                                </p>
                                <p style={{
                                    fontSize: "10px",
                                    color: "#9ca3af",
                                    margin: 0,
                                }}>
                                    Matricule: {participant.matricule}
                                </p>
                            </div>
                            <button
                                onClick={() => removeParticipantFromSession(index)}
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
                    ))}
                </div>

                {(!localSelectedSession?.participants || localSelectedSession.participants.length === 0) && (
                    <Grid style={{
                        textAlign: "center",
                        padding: "32px 16px",
                        color: "#6b7280",
                    }}>
                        <Users size={32} color="#d1d5db" style={{ marginBottom: "12px" }} />
                        <p style={{ margin: 0, fontSize: "14px" }}>
                            Aucun participant assigné
                        </p>
                        <p style={{ margin: "4px 0 0 0", fontSize: "12px" }}>
                            Cliquez sur "Ajouter" pour assigner des participants à cette session
                        </p>
                    </Grid>
                )}
            </Grid>
        </>
    );

    // Contenu de l'onglet Présence
    const renderPresenceTab = () => (
        <div>
            <div style={{ marginBottom: "24px" }}>
                <h3 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0 0 12px 0",
                }}>
                    Feuille de présence
                </h3>
                <p style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    lineHeight: "1.6",
                    margin: 0,
                }}>
                    Marquez la présence des participants à cette session de formation.
                </p>
            </div>

            {localSelectedSession?.participants?.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {localSelectedSession.participants.map((participant, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                padding: "16px",
                                backgroundColor: "#f9fafb",
                                borderRadius: "12px",
                                border: "1px solid #e5e7eb",
                                transition: "all 0.2s",
                            }}
                        >
                            <div style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "14px",
                                fontWeight: "600",
                                backgroundColor:
                                    index % 4 === 0 ? "#fb923c"
                                        : index % 4 === 1 ? "#60a5fa"
                                            : index % 4 === 2 ? "#34d399" : "#f59e0b",
                                color: "white",
                            }}>
                                {getInitial(participant.nom, participant.prenom)}
                            </div>

                            <div style={{ flex: 1 }}>
                                <p style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#111827",
                                    margin: "0 0 4px 0",
                                }}>
                                    {participant.nom} {participant.prenom}
                                </p>
                                <p style={{
                                    fontSize: "12px",
                                    color: "#6b7280",
                                    margin: "0 0 2px 0",
                                }}>
                                    {participant.email}
                                </p>
                                <p style={{
                                    fontSize: "11px",
                                    color: "#9ca3af",
                                    margin: 0,
                                }}>
                                    Matricule: {participant.matricule}
                                </p>
                            </div>

                            <div style={{ display: "flex", gap: "8px" }}>
                                <button
                                    onClick={() => togglePresence(participant.matricule, true)}
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: presenceData[participant.matricule] === true ? "#10b981" : "#f3f4f6",
                                        color: presenceData[participant.matricule] === true ? "white" : "#6b7280",
                                        border: "1px solid",
                                        borderColor: presenceData[participant.matricule] === true ? "#10b981" : "#d1d5db",
                                        borderRadius: "8px",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    <UserCheck size={14} />
                                    Présent
                                </button>
                                <button
                                    onClick={() => togglePresence(participant.matricule, false)}
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: presenceData[participant.matricule] === false ? "#dc2626" : "#f3f4f6",
                                        color: presenceData[participant.matricule] === false ? "white" : "#6b7280",
                                        border: "1px solid",
                                        borderColor: presenceData[participant.matricule] === false ? "#dc2626" : "#d1d5db",
                                        borderRadius: "8px",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    <UserX size={14} />
                                    Absent
                                </button>
                            </div>
                        </div>
                    ))}

                    <div style={{
                        marginTop: "16px",
                        padding: "16px",
                        backgroundColor: "#f0f9ff",
                        borderRadius: "8px",
                        border: "1px solid #bae6fd",
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "14px", fontWeight: "500", color: "#1e40af" }}>
                                Statistiques de présence
                            </span>
                            <div style={{ display: "flex", gap: "16px" }}>
                                <span style={{ fontSize: "12px", color: "#10b981" }}>
                                    Présents: {Object.values(presenceData).filter(p => p === true).length}
                                </span>
                                <span style={{ fontSize: "12px", color: "#dc2626" }}>
                                    Absents: {Object.values(presenceData).filter(p => p === false).length}
                                </span>
                                <span style={{ fontSize: "12px", color: "#6b7280" }}>
                                    Non marqués: {localSelectedSession.participants.length - Object.keys(presenceData).length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    color: "#6b7280",
                }}>
                    <UserCheck size={48} color="#d1d5db" style={{ marginBottom: "16px" }} />
                    <p style={{ margin: 0, fontSize: "16px" }}>
                        Aucun participant dans cette session
                    </p>
                    <p style={{ margin: "8px 0 0 0", fontSize: "14px" }}>
                        Ajoutez des participants pour gérer leur présence
                    </p>
                </div>
            )}
        </div>
    );

    // Contenu de l'onglet Évaluation
    const renderEvaluationTab = () => (
        <div>
            <div style={{ marginBottom: "24px" }}>
                <h3 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0 0 12px 0",
                }}>
                    Formulaire à chaud
                </h3>
                <p style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    lineHeight: "1.6",
                    margin: 0,
                }}>
                    Recueillez les avis et évaluations des participants sur cette session de formation.
                </p>
            </div>

            {localSelectedSession?.participants?.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {localSelectedSession.participants.map((participant, index) => (
                        <div
                            key={index}
                            style={{
                                padding: "20px",
                                backgroundColor: "#f9fafb",
                                borderRadius: "12px",
                                border: "1px solid #e5e7eb",
                            }}
                        >
                            {/* Header du participant */}
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                                <div style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    backgroundColor:
                                        index % 4 === 0 ? "#fb923c"
                                            : index % 4 === 1 ? "#60a5fa"
                                                : index % 4 === 2 ? "#34d399" : "#f59e0b",
                                    color: "white",
                                }}>
                                    {getInitial(participant.nom, participant.prenom)}
                                </div>
                                <div>
                                    <p style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#111827",
                                        margin: "0 0 2px 0",
                                    }}>
                                        {participant.nom} {participant.prenom}
                                    </p>
                                    <p style={{
                                        fontSize: "12px",
                                        color: "#6b7280",
                                        margin: 0,
                                    }}>
                                        {participant.email}
                                    </p>
                                </div>
                            </div>

                            {/* Grille d'évaluation */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "16px" }}>
                                {/* Satisfaction générale */}
                                <div>
                                    <label style={{
                                        display: "block",
                                        fontSize: "12px",
                                        color: "#6b7280",
                                        marginBottom: "8px",
                                        fontWeight: "500",
                                    }}>
                                        Satisfaction générale
                                    </label>
                                    <div style={{ display: "flex", gap: "4px" }}>
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <button
                                                key={rating}
                                                onClick={() => updateEvaluation(participant.matricule, 'satisfaction', rating)}
                                                style={{
                                                    padding: "4px",
                                                    backgroundColor: "transparent",
                                                    border: "none",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <Star
                                                    size={20}
                                                    color={
                                                        evaluationData[participant.matricule]?.satisfaction >= rating
                                                            ? "#f59e0b" : "#d1d5db"
                                                    }
                                                    fill={
                                                        evaluationData[participant.matricule]?.satisfaction >= rating
                                                            ? "#f59e0b" : "none"
                                                    }
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Qualité du contenu */}
                                <div>
                                    <label style={{
                                        display: "block",
                                        fontSize: "12px",
                                        color: "#6b7280",
                                        marginBottom: "8px",
                                        fontWeight: "500",
                                    }}>
                                        Qualité du contenu
                                    </label>
                                    <div style={{ display: "flex", gap: "4px" }}>
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <button
                                                key={rating}
                                                onClick={() => updateEvaluation(participant.matricule, 'contenu', rating)}
                                                style={{
                                                    padding: "4px",
                                                    backgroundColor: "transparent",
                                                    border: "none",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <Star
                                                    size={20}
                                                    color={
                                                        evaluationData[participant.matricule]?.contenu >= rating
                                                            ? "#f59e0b" : "#d1d5db"
                                                    }
                                                    fill={
                                                        evaluationData[participant.matricule]?.contenu >= rating
                                                            ? "#f59e0b" : "none"
                                                    }
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Qualité du formateur */}
                                <div>
                                    <label style={{
                                        display: "block",
                                        fontSize: "12px",
                                        color: "#6b7280",
                                        marginBottom: "8px",
                                        fontWeight: "500",
                                    }}>
                                        Qualité du formateur
                                    </label>
                                    <div style={{ display: "flex", gap: "4px" }}>
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <button
                                                key={rating}
                                                onClick={() => updateEvaluation(participant.matricule, 'formateur', rating)}
                                                style={{
                                                    padding: "4px",
                                                    backgroundColor: "transparent",
                                                    border: "none",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <Star
                                                    size={20}
                                                    color={
                                                        evaluationData[participant.matricule]?.formateur >= rating
                                                            ? "#f59e0b" : "#d1d5db"
                                                    }
                                                    fill={
                                                        evaluationData[participant.matricule]?.formateur >= rating
                                                            ? "#f59e0b" : "none"
                                                    }
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Zone de commentaires */}
                            <div>
                                <label style={{
                                    display: "block",
                                    fontSize: "12px",
                                    color: "#6b7280",
                                    marginBottom: "8px",
                                    fontWeight: "500",
                                }}>
                                    <MessageSquare size={14} style={{ display: "inline", marginRight: "4px" }} />
                                    Commentaires et suggestions
                                </label>
                                <textarea
                                    value={evaluationData[participant.matricule]?.commentaires || ""}
                                    onChange={(e) => updateEvaluation(participant.matricule, 'commentaires', e.target.value)}
                                    placeholder="Avis, suggestions d'amélioration..."
                                    style={{
                                        width: "100%",
                                        minHeight: "80px",
                                        padding: "10px 12px",
                                        border: "1px solid #d1d5db",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        backgroundColor: "#fff",
                                        resize: "vertical",
                                    }}
                                />
                            </div>
                        </div>
                    ))}

                    {/* Résumé des évaluations */}
                    <div style={{
                        marginTop: "20px",
                        padding: "20px",
                        backgroundColor: "#f0f9ff",
                        borderRadius: "12px",
                        border: "1px solid #bae6fd",
                    }}>
                        <h4 style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#1e40af",
                            margin: "0 0 12px 0",
                        }}>
                            Résumé des évaluations
                        </h4>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                            <div style={{ textAlign: "center" }}>
                                <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 4px 0" }}>
                                    Satisfaction moyenne
                                </p>
                                <p style={{ fontSize: "18px", fontWeight: "600", color: "#f59e0b", margin: 0 }}>
                                    {(Object.values(evaluationData).reduce((acc, curr) => acc + (curr?.satisfaction || 0), 0) /
                                        Object.values(evaluationData).length || 0).toFixed(1)}/5
                                </p>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 4px 0" }}>
                                    Contenu moyen
                                </p>
                                <p style={{ fontSize: "18px", fontWeight: "600", color: "#10b981", margin: 0 }}>
                                    {(Object.values(evaluationData).reduce((acc, curr) => acc + (curr?.contenu || 0), 0) /
                                        Object.values(evaluationData).length || 0).toFixed(1)}/5
                                </p>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 4px 0" }}>
                                    Formateur moyen
                                </p>
                                <p style={{ fontSize: "18px", fontWeight: "600", color: "#3b82f6", margin: 0 }}>
                                    {(Object.values(evaluationData).reduce((acc, curr) => acc + (curr?.formateur || 0), 0) /
                                        Object.values(evaluationData).length || 0).toFixed(1)}/5
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    color: "#6b7280",
                }}>
                    <MessageSquare size={48} color="#d1d5db" style={{ marginBottom: "16px" }} />
                    <p style={{ margin: 0, fontSize: "16px" }}>
                        Aucun participant dans cette session
                    </p>
                    <p style={{ margin: "8px 0 0 0", fontSize: "14px" }}>
                        Ajoutez des participants pour recueillir leurs évaluations
                    </p>
                </div>
            )}
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case "general":
                return renderGeneralTab();
            case "presence":
                return renderPresenceTab();
            case "evaluation":
                return renderEvaluationTab();
            default:
                return renderGeneralTab();
        }
    };

    const handleSave = () => {
        if (addSession) {
            onCreateSession({
                ...sessionData,
                participants: localSelectedSession?.participants || []
            });
        } else {
            onSaveSession({
                ...sessionData,
                participants: localSelectedSession?.participants || [],
                presenceData,
                evaluationData
            });
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
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
                onClick={handleClose}
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
                        <Grid style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                            onClick={handleClose}
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

                    {/* Onglets Navigation */}
                    {!addSession && (
                        <Grid
                            style={{
                                display: "flex",
                                borderBottom: "1px solid #e5e7eb",
                                backgroundColor: "#f9fafb",
                            }}
                        >
                            <button
                                onClick={() => setActiveTab("general")}
                                style={{
                                    flex: 1,
                                    padding: "12px 16px",
                                    border: "none",
                                    backgroundColor: activeTab === "general" ? "white" : "transparent",
                                    color: activeTab === "general" ? "#3b82f6" : "#6b7280",
                                    borderBottom: activeTab === "general" ? "2px solid #3b82f6" : "2px solid transparent",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    transition: "all 0.2s",
                                }}
                            >
                                <Info size={16} />
                                Informations générales
                            </button>
                            <button
                                onClick={() => setActiveTab("presence")}
                                style={{
                                    flex: 1,
                                    padding: "12px 16px",
                                    border: "none",
                                    backgroundColor: activeTab === "presence" ? "white" : "transparent",
                                    color: activeTab === "presence" ? "#3b82f6" : "#6b7280",
                                    borderBottom: activeTab === "presence" ? "2px solid #3b82f6" : "2px solid transparent",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    transition: "all 0.2s",
                                }}
                            >
                                <ClipboardList size={16} />
                                Présence
                            </button>
                            <button
                                onClick={() => setActiveTab("evaluation")}
                                style={{
                                    flex: 1,
                                    padding: "12px 16px",
                                    border: "none",
                                    backgroundColor: activeTab === "evaluation" ? "white" : "transparent",
                                    color: activeTab === "evaluation" ? "#3b82f6" : "#6b7280",
                                    borderBottom: activeTab === "evaluation" ? "2px solid #3b82f6" : "2px solid transparent",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    transition: "all 0.2s",
                                }}
                            >
                                <Star size={16} />
                                Formulaire à chaud
                            </button>
                        </Grid>
                    )}

                    {/* Modal Content */}
                    <Grid
                        style={{
                            padding: "24px",
                            overflowY: "auto",
                            maxHeight: addSession ? "calc(90vh - 120px)" : "calc(90vh - 180px)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "24px",
                        }}
                    >
                        {renderTabContent()}
                    </Grid>

                    {/* Action Buttons */}
                    <div style={{
                        borderTop: "1px solid #e5e7eb",
                        paddingTop: "16px",
                        padding: "16px 24px",
                        display: "flex",
                        gap: "12px",
                        justifyContent: "space-between",
                    }}>
                        {/* Dialog de confirmation de suppression */}
                        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                            <DialogTitle>Confirmer la suppression</DialogTitle>
                            <DialogContent>
                                Êtes-vous sûr de vouloir supprimer cette session ?
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
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
                                onClick={handleClose}
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
                                onClick={handleSave}
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

            {/* Styles CSS */}
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
        </>
    );
};

export default SessionModal;