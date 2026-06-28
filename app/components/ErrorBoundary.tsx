"use client";
import { Component, type ReactNode } from "react";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { crashed: boolean; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { crashed: false };
  static getDerivedStateFromError() { return { crashed: true }; }
  render() {
    if (this.state.crashed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
