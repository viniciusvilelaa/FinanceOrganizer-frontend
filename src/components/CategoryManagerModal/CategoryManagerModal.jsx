import React, { useState, useEffect } from "react";
import BaseModalCard from "../ModalFather/BaseModalCard";
import { useCategories } from "../../hooks/categories/useCategories";
import { useCreateCategory } from "../../hooks/categories/useCreateCategory";
import { useUpdateCategory } from "../../hooks/categories/useUpdateCategory";
import { useDeleteCategory } from "../../hooks/categories/useDeleteCateogy";
import { Pencil, Trash2, Plus, Check, X, Loader2, Tag, RotateCcw } from "lucide-react";
import "./CategoryManagerModal.css";

const PRESET_COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Emerald
  "#EF4444", // Red
  "#F59E0B", // Amber
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#14B8A6", // Teal
  "#6366F1", // Indigo
  "#F97316", // Orange
  "#64748B", // Slate
];

export default function CategoryManagerModal({ isOpen, onClose }) {
  const { data: categories = [], isLoading, isError } = useCategories();
  const { createCategory, isPending: isCreating } = useCreateCategory();
  const { updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { deleteCategory, isPending: isDeleting } = useDeleteCategory();

  const [name, setName] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // When modal closes, reset states
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  function resetForm() {
    setName("");
    setColor(PRESET_COLORS[0]);
    setEditingCategory(null);
    setDeletingId(null);
  }

  function handleStartEdit(cat) {
    setEditingCategory(cat);
    setName(cat.name || "");
    setColor(cat.color || PRESET_COLORS[0]);
    setDeletingId(null);
  }

  function handleCancelEdit() {
    resetForm();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingCategory) {
        await updateCategory({
          id: editingCategory.id,
          data: { name: name.trim(), color },
        });
      } else {
        await createCategory({
          name: name.trim(),
          color,
        });
      }
      resetForm();
    } catch (err) {
      // Errors handled via toast in hooks
    }
  }

  async function ConfirmDelete(id) {
    try {
      await deleteCategory(id);
      if (editingCategory?.id === id) {
        resetForm();
      }
      setDeletingId(null);
    } catch (err) {
      // Errors handled via toast in hooks
    }
  }

  const isSubmitting = isCreating || isUpdating;

  return (
    <BaseModalCard isOpen={isOpen} onClose={onClose} title="Gerenciar Categorias" size="md">
      <div className="cat-modal-container">
        {/* Category Form (Create or Edit) */}
        <form onSubmit={handleSubmit} className="cat-form">
          <div className="cat-form-header">
            <span className="cat-form-title">
              {editingCategory ? (
                <>
                  <Pencil className="w-4 h-4 text-blue-600" />
                  Editar Categoria
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-emerald-600" />
                  Nova Categoria
                </>
              )}
            </span>
            {editingCategory && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="cat-cancel-edit-btn"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Cancelar edição
              </button>
            )}
          </div>

          <div className="cat-input-group">
            <div className="cat-input-wrapper">
              <span
                className="cat-color-preview-badge"
                style={{ backgroundColor: color }}
              />
              <input
                type="text"
                placeholder="Nome da categoria..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="cat-text-input"
                maxLength={30}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Color Palette Selector */}
          <div className="cat-color-section">
            <label className="cat-color-label">Selecione uma cor:</label>
            <div className="cat-color-palette">
              {PRESET_COLORS.map((presetColor) => (
                <button
                  key={presetColor}
                  type="button"
                  onClick={() => setColor(presetColor)}
                  className={`cat-color-swatch ${color === presetColor ? "selected" : ""}`}
                  style={{ backgroundColor: presetColor }}
                  title={presetColor}
                >
                  {color === presetColor && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}

              {/* Custom Native Color Picker Input */}
              <div className="cat-custom-color-wrapper" title="Cor personalizada">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="cat-custom-color-input"
                />
                <span className="cat-custom-color-icon">+</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className={`cat-submit-btn ${editingCategory ? "edit-mode" : ""}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {editingCategory ? "Salvando..." : "Criando..."}
              </>
            ) : editingCategory ? (
              <>
                <Check className="w-4 h-4" />
                Salvar Alterações
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Adicionar Categoria
              </>
            )}
          </button>
        </form>

        <hr className="cat-divider" />

        {/* Existing Categories List */}
        <div className="cat-list-section">
          <h3 className="cat-list-title">
            <Tag className="w-4 h-4 text-gray-500" />
            Categorias Existentes ({categories.length})
          </h3>

          {isLoading ? (
            <div className="cat-loading-state">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span>Carregando categorias...</span>
            </div>
          ) : isError ? (
            <div className="cat-error-state">
              Ocorreu um erro ao carregar as categorias.
            </div>
          ) : categories.length === 0 ? (
            <div className="cat-empty-state">
              Nenhuma categoria cadastrada ainda.
            </div>
          ) : (
            <div className="cat-list">
              {categories.map((cat) => {
                const isItemDeleting = isDeleting && deletingId === cat.id;
                const isBeingEdited = editingCategory?.id === cat.id;
                const isSystemCategory = cat.userId == null;

                return (
                  <div
                    key={cat.id}
                    className={`cat-item ${isBeingEdited ? "editing" : ""}`}
                  >
                    <div className="cat-item-left">
                      <span
                        className="cat-item-color-dot"
                        style={{ backgroundColor: cat.color || "#94A3B8" }}
                      />
                      <span className="cat-item-name">{cat.name}</span>
                    </div>

                    {!isSystemCategory && (
                      <div className="cat-item-actions">
                        {deletingId === cat.id ? (
                          <div className="cat-confirm-delete-box">
                            <span className="cat-confirm-text">Excluir?</span>
                            <button
                              type="button"
                              onClick={() => ConfirmDelete(cat.id)}
                              disabled={isDeleting}
                              className="cat-confirm-yes-btn"
                              title="Confirmar exclusão"
                            >
                              {isItemDeleting ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                "Sim"
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingId(null)}
                              disabled={isDeleting}
                              className="cat-confirm-no-btn"
                              title="Cancelar"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => handleStartEdit(cat)}
                              className="cat-action-btn edit"
                              title="Editar categoria"
                              disabled={isSubmitting}
                            >
                              <Pencil className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeletingId(cat.id)}
                              className="cat-action-btn delete"
                              title="Excluir categoria"
                              disabled={isSubmitting || isDeleting}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </BaseModalCard>
  );
}
